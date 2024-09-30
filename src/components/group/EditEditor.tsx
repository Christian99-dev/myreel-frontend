import { GetEditResponse } from "@/types/EditService";
import UserTags from "../shared/UserTags";
import EditVideo from "./EditVideo";
import { User } from "@/types/GroupService";
import SlotEditor from "./SlotEditor";

export default function EditEditor({ editRes, me }: { editRes: GetEditResponse, me: User }) {

  const {slots, edit : {name, video_src}} = editRes
  const users = slots
  .filter(slot => slot.occupied_by)
  .map(slot => ({
    name: slot.occupied_by!.name,
    id: slot.occupied_by!.user_id
  }))
  .reduce((uniqueUsers, user) => {
    if (!uniqueUsers.some(existingUser => existingUser.id === user.id)) {
      uniqueUsers.push(user);
    }
    return uniqueUsers;
  }, [] as { name: string, id: number }[]);


  return (
    <div className="w-full h-full flex flex-col items-center mt-[--spacing-4]">
      {/**Title and Users */}
      <h1 className="fs-9 font-medium text-purple-light pb-[--spacing-4]">{name}</h1>
      <UserTags users={users} />

      {/** Edit */}
      <EditVideo videoSrc={video_src} className="mb-[--spacing-10]" />
      
      {/** Slots */}
      <SlotEditor slots={slots} me={me} />
      
    </div>
  );
}

