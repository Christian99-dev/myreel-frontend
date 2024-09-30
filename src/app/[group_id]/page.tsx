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
  GetEditsResponse,
  GetMembersResponse,
  GetResponse,
  User,
} from "@/types/GroupService";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoadingText from "@/components/shared/LoadingText";
import EditList from "@/components/group/EditList";
import EditEditor from "@/components/group/EditEditor";
import { EditService } from "@/services/backend/EditService";
import { GetEditResponse } from "@/types/EditService";

export default function Page() {
  const { group_id: group_id_param } = useParams<{ group_id: string }>();
  const groupService = new GroupService();
  const editService = new EditService();
  const router = useRouter();

  // State
  const [selectedEditId, setSelectedEditId] = useState<number | null>();
  
  // Modal
  const [inviteFriendsModal, setInviteFriedsModal] = useState(false);
  const [createEditModal, setCreateEditModal] = useState(false);
  
  // Responses
  const [groupRes, setGroupRes] = useState<GetResponse | null>(null);
  const [me, setMe] = useState<User | null>(null);
  const [membersRes, setMembersRes] = useState<GetMembersResponse | null>(null);
  const [editsRes, setEditsRes] = useState<GetEditsResponse | null>(null);
  const [editRes, setEditRes] = useState<GetEditResponse | null>();
  
  // Page behaviour
  const pageIsLoading = !groupRes || !me || !membersRes || !editsRes;
  const noEditsInGroup = editsRes?.edits.length == 0;
  const noEditSelected = !selectedEditId;
  const EditsThereButNoEditSelected = !noEditsInGroup && noEditSelected;
  const EditIsSelectedButResIsLoading = !noEditSelected && (!editRes || editRes.edit.video_src === "")
  const editIsLoaded = editRes && editRes.edit.video_src !== ""

  // Workaround, selectedID ist im callback undefined zu dem zeitpunkt der initialisierung
  const selectedEditIdRef = useRef<number | null | undefined>(null);
  
  const updateMembers = () => {
    groupService
      .getGroupMembers(group_id_param)
      .onError(() => alert("Etwas ist schiefgelaufen"))
      .onSuccess((res) => setMembersRes(res));
  };

  const updateEdits = () => {
    groupService
      .getGroupEdits(group_id_param)
      .onError((_, statuscode) => {
        switch (statuscode) {
          case 404: {
            setEditsRes({ edits: [] });
            break;
          }

          default: {
            alert("Etwas ist schiefgelaufen!");
          }
        }
      })
      .onSuccess((res) => setEditsRes(res));
  };

  const updateEdit = () => {
    if (!selectedEditIdRef.current) return;
    editService
      .getEditDetails(selectedEditIdRef.current)
      .onError(() => {
        alert("Etwas ist schief gelaufen");
      })
      .onSuccess((editRes) => {
        setEditRes(editRes);
      });
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

  // Websocket
  useEffect(() => {
    if (pageIsLoading) return;

    // Websocket connect
    const ws = new WebSocketService(groupRes.group_id)
      .onUserChange(() => {
        updateMembers()
      })
      .onEditChange(() => {
        updateEdits();
        updateEdit();
      })
      .onOccupiedSlotChange(() => {
        updateEdit();
      })
      .onError((_) => alert("WebSocket-Fehler"));

    return () => {
      ws.close();
    };
  }, [pageIsLoading]);

  // onChangeSelectedEdit
  useEffect(() => {
    selectedEditIdRef.current = selectedEditId; // Ref dem state spiegeln
    updateEdit();
  }, [selectedEditId]);

  if (pageIsLoading)
    return (
      <div className="w-screen h-screen bg-purple-dark flex items-center justify-center flex-col">
        <h1 className="fs-7 font-normal text-pink-very-light">
          <LoadingText text="Trette Gruppe bei" />
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
        setSelectedEditId={setSelectedEditId}
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
              active={selectedEditId}
              edits={editsRes.edits}
              onChange={(edit_id) => setSelectedEditId(edit_id)}
            />
            <PanelButton
              alt="create"
              text="Edit Erstellen"
              onClick={() => setCreateEditModal(true)}
              user={{ id: me.id, name: me.name }}
            />
          </div>
        </>
        <>
          {noEditsInGroup && <NoEditsInGroupBanner />}
          {EditsThereButNoEditSelected && <EditsThereButNoEditSelectedBanner />}
          {EditIsSelectedButResIsLoading && <LoadingBanner/>}
          {editIsLoaded && <EditEditor editRes={editRes} me={me} selectedEditId={selectedEditId} />}
        </>
      </PanelLayout>
    </>
  );
}

const EditsThereButNoEditSelectedBanner = () => {
  return (
    <div className="w-full h-full flex flex-col text-center">
      <h2 className="font-medium fs-7 text-purple-light opacity-50 mb-[--spacing-10]">
        Wähle ein Edit aus
      </h2>
    </div>
  );
};

const NoEditsInGroupBanner = () => {
  return (
    <div className="w-full h-full flex flex-col text-center">
      <h2 className="font-medium fs-7 text-purple-light opacity-50 mb-[--spacing-10]">
        Ziemlich leer hier
      </h2>
      <h2 className="font-medium fs-9 text-purple-light px-[25%]">
        Klicken auf den Button{" "}
        <span className="font-bold text-pink-very-light">“Edit Erstellen”</span>{" "}
        Links in der Leiste, und suche dir eine Song aus der dir gefällt
      </h2>
    </div>
  );
};

const LoadingBanner = () => (
  <div className="w-full h-full bg-purple-dark flex items-center justify-center flex-col">
    <h1 className="fs-7 text-bold pb-[--spacing-10] font-normal text-pink-very-light">
      <LoadingText text="Edit wird geladen" />
    </h1>
    <Icon
      floating={true}
      strokeWidth={3}
      name="bigHero"
      customSizeTailwindString="text-[150px]"
      color="pink-very-light"
    />
  </div>
);
