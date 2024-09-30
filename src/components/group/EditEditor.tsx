import { GetEditResponse } from "@/types/EditService";
import UserTags from "../shared/UserTags";
import EditVideo from "./EditVideo";
import { User } from "@/types/GroupService";
import SlotEditor from "./SlotsEditor";

export default function EditEditor({ editRes, me, selectedEditId }: { editRes: GetEditResponse, me: User, selectedEditId: number | null | undefined }) {

  const {slots, edit : {name, video_src, isLive}} = editRes
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
      <EditVideo videoSrc={video_src + "?randomkey="+ (Math.random() + 1).toString(36).substring(7)} className="mb-[--spacing-10]" /> 
      
      {/** Slots */}
      <SlotEditor slots={slots} me={me} selectedEditId={selectedEditId} isLive={isLive} />
      
    </div>
  );
}

