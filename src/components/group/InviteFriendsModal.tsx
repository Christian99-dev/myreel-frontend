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
        <p className="fs-10 text-purple-very-light text-center">
          Lade jetzt deine freunde in die Gruppe <br /> {groupName} <br /> ein
          und erstellt Edits gemeinsam !
        </p>
        <Input
          label="E-mail"
          placeholder="Hier email Eingeben"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          iconName="rocket"
          text="Einladen"
          onClick={() => {
            userService
              .invite({ email: email, groupid: groupid })
              .onError(() => {
                alert("Etwas ist schiefgelaufen");
                setEmail("");
                onClose();
              })
              .onSuccess((res) => {
                alert("Dankeschön! Email wurde versendet!");
                setEmail("");
                onClose();
              });
          }}
        />
      </Slide>
    </Modal>
  );
}
