"use client";

import InviteFriendModal from "@/components/group/InviteFriendsModal";
import CreateEditModal from "@/components/group/CreateEditModal";
import Button from "@/components/shared/Button";
import Icon from "@/components/shared/Icon";
import PanelButton from "@/components/shared/PanelButton";
import PanelLayout from "@/components/shared/PanelLayout";
import UserTags from "@/components/shared/UserTags";
import { GroupService } from "@/services/backend/GroupService";
import { WebSocketService } from "@/services/backend/WebSocketService";
import {
  Edit as EditPreview,
  GetEditsResponse,
  GetMembersResponse,
  GetResponse,
  User,
} from "@/types/GroupService";

import { Edit } from "@/types/EditService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingText from "@/components/shared/LoadingText";

export default function Page() {
  const { group_id: group_id_param } = useParams<{ group_id: string }>();
  const groupService = new GroupService();
  const router = useRouter();

  // State
  const [activeEditId, setActiveEditId] = useState<number | null>();
  const [inviteFriendsModal, setInviteFriedsModal] = useState(false);
  const [createEditModal, setCreateEditModal] = useState(false);

  // Responses
  const [groupRes, setGroupRes] = useState<GetResponse | null>(null);
  const [me, setMe] = useState<User | null>(null);
  const [membersRes, setMembersRes] = useState<GetMembersResponse | null>(null);
  const [editsRes, setEditsRes] = useState<GetEditsResponse | null>(null);

  // Page behaviour
  const pageIsLoading = !groupRes || !me || !membersRes || !editsRes;
  const noEditSelected = !activeEditId;
  const noEditsInGroup =  !editsRes || editsRes.edits.length == 0

  const updateMembers = () => {
    groupService
      .getGroupMembers(group_id_param)
      .onError(() => alert("Etwas ist schiefgelaufen"))
      .onSuccess((res) => setMembersRes(res));
  };

  const updateEdits = () => {
    groupService
      .getGroupEdits(group_id_param)
      .onError((_,statuscode) => {
        switch(statuscode) {
          case 404: {
            setEditsRes({edits: []})
            break;
          }

          default: {
            alert("Etwas ist schiefgelaufen!")
          }

        }
      })
      .onSuccess((res) => setEditsRes(res));
  };

  // onStart
  useEffect(() => {
    if (!group_id_param) {
      router.push("/");
      return;
    }

    groupService
      .getGroup(group_id_param)
      .onError((_, statuscode) => {
        console.log("error");
        switch (statuscode) {
          case 404: {
            alert("Group not found");
            router.push("/");
            break;
          }
          case 403: {
            alert("Unauthorized");
            router.push("/");
            break;
          }
          default: {
            alert(statuscode);
            router.push("/");
            break;
          }
        }
      })
      .onSuccess((res) => {
        setGroupRes(res);
        setMe(res.user);
        updateMembers();
        updateEdits();
      });
  }, []);

  // onFirstSuccessfull Render
  useEffect(() => {
    if (pageIsLoading) return;

    // Websocket connect
    const ws = new WebSocketService(groupRes.group_id)
      .onUserChange(() => updateMembers())
      .onEditChange(() => updateEdits())
      .onError((_) => alert("WebSocket-Fehler"));

    // Selecting Edit
    if(!noEditsInGroup)
      setActiveEditId(editsRes.edits[0].edit_id);

    return () => {
      ws.close();
    };
  }, [pageIsLoading]);

  if (pageIsLoading)
    return (
      <div className="w-screen h-screen bg-purple-dark flex items-center justify-center flex-col">
        <h1 className="fs-7 font-normal text-pink-very-light">
          <LoadingText text="Trette Gruppe bei"/>
        </h1>
        <Icon
          floating={true}
          strokeWidth={3}
          name="bigHero"
          customSizeTailwindString="text-[600px]"
          color="pink-very-light"
        />
      </div>
    );

  return (
    <>
      <InviteFriendModal
        open={inviteFriendsModal}
        onClose={() => setInviteFriedsModal(false)}
        groupName={groupRes.group_name}
        groupid={groupRes.group_id}
      />

      <CreateEditModal
        open={createEditModal}
        onClose={() => setCreateEditModal(false)}
        groupid={groupRes.group_id}
        setActiveEditId={setActiveEditId}
      />

      <PanelLayout>
        <>
          {/** Header */}
          <div className="flex justify-between items-center">
            <div className="flex gap-[--spacing-5] items-center">
              <h1 className="font-bold fs-9 text-pink-very-light">
                {groupRes.group_name}
              </h1>
              <p className="fs-10 text-purple-light">@{groupRes.created_by}</p>
            </div>

            <div className="flex gap-[--spacing-5] items-center">
              <UserTags
                users={membersRes.members.map(({ name, user_id }) => ({
                  name,
                  id: user_id,
                }))}
              />

              <Button
                text="Freunde Einladen"
                iconName="rocket"
                onClick={() => {
                  setInviteFriedsModal(true);
                }}
              />
            </div>
          </div>
        </>

        {/** Sidebar */}
        <>
          <div className="flex flex-col gap-[--spacing-1]">
            <EditList
              active={activeEditId}
              edits={editsRes.edits}
              onChange={(edit_id) => setActiveEditId(edit_id)}
            />
            <PanelButton
              alt="create"
              text="Edit Erstellen"
              onClick={() => setCreateEditModal(true)}
              user={{ id: me.id, name: me.name }}
            />
          </div>
        </>
        <></>
      </PanelLayout>
    </>
  );
}

const EditList = ({
  edits,
  onChange,
  active,
}: {
  edits: EditPreview[];
  onChange: (edit_id: number) => void;
  active?: number| null;
}) => {
  return edits.map(({ name, edit_id, created_by, isLive }) => {
    return (
      <PanelButton
        greenBorder={isLive}
        key={edit_id}
        text={name}
        active={active == edit_id}
        onClick={() => onChange(edit_id)}
        user={{
          id: created_by.user_id,
          name: created_by.name,
        }}
      />
    );
  });
};
