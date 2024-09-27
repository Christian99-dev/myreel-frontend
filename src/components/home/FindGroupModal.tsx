import Modal, { ModalHandle, Slide } from "../shared/Modal";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { GroupService } from "@/services/backend/GroupService";
import { UserService } from "@/services/backend/UserService";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function FindGroupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<ModalHandle>(null);
  const router = useRouter();
  const groupService = new GroupService();
  const userService = new UserService();

  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const goToGroupIfLoggedIn = () => groupService.getGroup(groupId).onSuccess((res) => router.push("/" + res.group_id))

  const clear = () => {
    setGroupName("");
    setGroupId("");
    setEmail("");
    setPin("");
  };

  return (
    <Modal title="Gruppe Suchen" ref={modalRef} open={open} onClose={onClose}>
      {/** Gruppe Suchen */}
      <Slide>
        <Input
          label="Gruppen-ID"
          placeholder="Hier Gruppen-ID Eingeben"
          onChange={(e) => setGroupId(e.target.value)}
          value={groupId}
        />
        <Button
          iconName="search"
          disabled={isLoading}
          text="Gruppe Suchen"
          onClick={() => {
            setIsLoading(true)
            groupService
              .getGroupName(groupId)
              .onError((_, statuscode) => {
                setIsLoading(false);
                clear();
                switch (statuscode) {
                  case 404: {
                    alert("Gruppe leider nicht Gefunden!");
                    break;
                  }
                  default: {
                    alert(statuscode);
                    break;
                  }
                }
              })
              .onSuccess((res) => {
                // Direkt weiterleiten
                goToGroupIfLoggedIn()

                // Oder login
                setIsLoading(false);
                setGroupName(res.name);
                modalRef.current?.slideTo(1);
              });
          }}
        />
      </Slide>

      {/** Login Anfrodern */}
      <Slide>
        <p className="fs-9 text-purple-light font-bold">"{groupName}"</p>
        <Input
          label="Email"
          placeholder="Deine Email Eingeben"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          disabled={isLoading}
          text="PIN anfordern"
          onClick={() => {
            setIsLoading(true)
            userService
              .loginRequest({ email: email, groupid: groupId })
              .onError((_, statuscode) => {
                setIsLoading(false);
                switch (statuscode) {
                  case 404: {
                    alert("Email nicht gefunden!");
                    break;
                  }
                  default: {
                    alert(statuscode);
                    break;
                  }
                }
              })
              .onSuccess((res) => {
                setIsLoading(false);
                modalRef.current?.slideTo(2);
              });
          }}
        />
      </Slide>
      
      {/** Einloggen */}
      <Slide>
        <p className="fs-10 text-purple-light text-center">"Es wurde eine email an <br/><span className="font-bold text-pink-very-light">{email} </span>gesendet!</p>
        <Input
          label="PIN"
          placeholder="PIN aus der Email"
          onChange={(e) => setPin(e.target.value)}
          value={pin}
        />
        <Button
          disabled={isLoading}
          text="Login"
          onClick={() => {
            setIsLoading(true)
            userService
              .login({ email: email, groupid: groupId, pin: pin})
              .onError((_, statuscode) => {
                setIsLoading(false);
                switch (statuscode) {
                  case 400: {
                    alert("Ungültiger pin");
                    break;
                  }
                  default: {
                    alert(statuscode);
                    break;
                  }
                }
              })
              .onSuccess((res) => {
                router.push("/" + groupId)
              });
          }}
        />
      </Slide>
    </Modal>
  );
}
