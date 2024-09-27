import { useRef, useState } from "react";
import Modal, { ModalHandle, Slide } from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import Button from "../shared/Button";
import { UserService } from "@/services/backend/UserService";

export default function InviteFriendModal({
  open,
  onClose,
  groupid,
  groupName,
}: {
  open: boolean;
  onClose: () => void;
  groupid: string;
  groupName: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const userService = new UserService();
  const modalRef = useRef<ModalHandle>(null);
  const [email, setEmail] = useState("");

  return (
    <Modal
      title="Freunde Einladen"
      ref={modalRef}
      open={open}
      onClose={onClose}
    >
      <Slide>
        <p className="fs-10 text-pink-very-light text-center">
          Lade jetzt deine freunde in die <span className="font-bold text-purple-light">{groupName}</span> ein <br />
        </p>
        <Input
          label="E-mail"
          placeholder="Hier email Eingeben"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          disabled={isLoading}
          iconName="rocket"
          text="Einladen"
          onClick={() => {
            setIsLoading(true);
            userService
              .invite({ email: email, groupid: groupid })
              .onError(() => {
                alert("Etwas ist schiefgelaufen");
                setIsLoading(false);
              })
              .onSuccess((res) => {
                alert("Dankeschön! Email wurde versendet!");
                setIsLoading(false);
                setEmail("");
                onClose();
              });
          }}
        />
      </Slide>
    </Modal>
  );
}
