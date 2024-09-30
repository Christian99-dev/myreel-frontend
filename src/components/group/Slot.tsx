import { Slot as SlotType } from "@/types/EditService";
import { User } from "@/types/GroupService";
import Icon from "../shared/Icon";
import UserTag from "../shared/UserTag";

export default function Slot({
  slot,
  me,
  widthPercentage,
  backgroundColor,
  strokeColor,
}: {
  slot: SlotType;
  me: User;
  widthPercentage: number;
  backgroundColor: string;
  strokeColor: string;
}) {
  const byMe = slot.occupied_by && slot.occupied_by.user_id === me.id

  const background = `bg-gradient-to-t from-purple-dark ${backgroundColor} ${
    slot.occupied_by ? "from-70%" : "from-71%"
  } to-100%`;
  const border = byMe ? "border-2 border-green" : "";

  const openSlotStyle = `hover:top-[-5px] cursor-pointer`
  const lockedSlotStyle = `cursor-not-allowed`

  return (
    <div
      className="h-[75px] relative"
      style={{
        width: `${widthPercentage}%`,
      }}
    >
      <div
        className={`absolute ${border} ${background} ${slot.occupied_by ? lockedSlotStyle : openSlotStyle} flex flex-col justify-center items-center rounded-main top-0 bottom-0 left-0 right-0 transition-all gap-[--spacing-1]`}
      >
        <Icon
          customStrokeColor={strokeColor}
          color="purple"
          name={slot.occupied_by ? "lockClosed" : "lockOpen"}
          onlyCursor={!slot.occupied_by}
        />
        {slot.occupied_by && <UserTag name={slot.occupied_by.name} id={slot.occupied_by.user_id}/>}
      </div>
    </div>
  );
}
