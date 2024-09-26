"use client";

import AcceptInviteModal from "@/components/acceptInvite/AcceptInviteModal";
import Icon from "@/components/shared/Icon";
import { GroupService } from "@/services/backend/GroupService";
import { GroupNameResponse } from "@/types/GroupService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { group_id, invite_id, token } = useParams<{
    group_id: string;
    invite_id: string;
    token: string;
  }>();
  const [openAcceptInviteModal, setOpenAcceptInviteModal] = useState(false);
  const [groupNameResponse, setGroupNameResponse] = useState<GroupNameResponse | null>(null);
  const groupService = new GroupService()
  const router = useRouter()

  useEffect(() => {
    groupService
    .getGroupName(group_id)
    .onSuccess((response) => {
      setGroupNameResponse(response);
      setOpenAcceptInviteModal(true)
    })
    .onError((error, statusCode) => {
      alert(`Error getting group name: ${error}`);
      router.push("/")
    });
  }, [])

  return (
    <>
      {groupNameResponse && <AcceptInviteModal
        open={openAcceptInviteModal}
        onClose={() => setOpenAcceptInviteModal(false)}
        groupid={group_id}
        inviteid={invite_id}
        token={token}
        groupName={groupNameResponse.name}
      />}
      <div className="w-screen h-screen bg-purple-dark flex items-center justify-center">
        <Icon
          strokeWidth={4}
          name="bigHero"
          customSizeTailwindString="text-[600px]"
          color="pink-very-light"
        />
      </div>
    </>
  );
}
