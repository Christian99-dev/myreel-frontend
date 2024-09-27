import Modal, { ModalHandle, Slide } from "../shared/Modal";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { GroupService } from "@/services/backend/GroupService";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function CreateGroupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<ModalHandle>(null);
  const router = useRouter();
  const groupService = new GroupService();

  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      title="Gruppe Erstellen"
      ref={modalRef}
      open={open}
      onClose={onClose}
    >
      {/** Gruppe Suchen */}
      <Slide>
        <Input
          label="Gruppenname"
          placeholder="Hier Gruppenname eingeben"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />

        <Input
          label="E-mail"
          placeholder="Hier deine E-mail eingeben"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Input
          label="Username"
          placeholder="Hier dein Usernamen eingeben"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <Button
          disabled={isLoading}
          iconName="plus"
          text="Gruppe Erstellen"
          onClick={() => {
            setIsLoading(true);
            groupService
              .createGroup({
                groupname: groupName,
                email: email,
                username: userName,
              })
              .onError((_, statuscode) => {
                setIsLoading(false);
                switch (statuscode) {
                  case 422: {
                    alert("Bitte alle felder richtig ausfüllen!");
                    return;
                  }
                  default: {
                    alert("Etwas ist schiefgelaufen");
                    break;
                  }
                }
              })
              .onSuccess((res) => {
                router.push("/" + res.group_id)
              });
          }}
        />
      </Slide>
    </Modal>
  );
}
