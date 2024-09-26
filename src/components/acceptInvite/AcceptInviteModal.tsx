"use client";

import { useRef, useState } from "react";
import Modal, { ModalHandle, Slide } from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import Button from "../shared/Button";
import { UserService } from "@/services/backend/UserService";
import { useRouter } from "next/navigation";

export default function AcceptInviteModal({
  open,
  onClose,
  groupid,
  groupName,
  inviteid,
  token,
}: {
  open: boolean;
  onClose: () => void;
  groupid: string;
  groupName: string;
  inviteid: string;
  token: string;
}) {
  const userService = new UserService();
  const modalRef = useRef<ModalHandle>(null);
  const router = useRouter();
  const [userName, setUserName] = useState("");

  return (
    <Modal title="Einladung" ref={modalRef} open={open} onClose={onClose}>
      <Slide>
        <p className="fs-10 text-purple-very-light text-center">
          Einlung <span className="font-bold text-purple-light"> {groupName} </span> Beizutreten
        </p>
        <Input
          label="Username"
          value={userName}
          placeholder="Dein Wunschname in der Gruppe"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button
          iconName="rocket"
          text="Beitreten"
          onClick={() => {
            userService
              .acceptInvite({
                groupid: groupid,
                invitationid: inviteid,
                token: token,
                name: userName,
              })
              .onError(() => {
                alert("Etwas ist schiefgelaufen");
              })
              .onSuccess((res) => {
                router.push("/" + groupid);
              });
          }}
        />
      </Slide>
    </Modal>
  );
}
