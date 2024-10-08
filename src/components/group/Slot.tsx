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
  onClick,
  selected
}: {
  slot: SlotType;
  me: User;
  widthPercentage: number;
  backgroundColor: string;
  strokeColor: string;
  onClick: () => void;
  selected: boolean
}) {
  const byMe = slot.occupied_by && slot.occupied_by.user_id === me.id

  const background = `bg-gradient-to-t from-purple-dark ${backgroundColor} ${
    slot.occupied_by ? "from-70%" : "from-71%"
  } to-100%`;
  const border = byMe ? "border-2 border-green" : "";

  const openSlotStyle = `hover:top-[-5px] hover:bottom-[5px] cursor-pointer`
  const lockedSlotStyle = `cursor-not-allowed`
  const selectedStyle =  selected ? "!top-[-5px] !bottom-[5px]" : ""

  return (
    <div
      className="h-[75px] relative"
      style={{
        width: `${widthPercentage}%`,
      }}
      onClick={() => !(slot.occupied_by && !byMe) && onClick()}
    >
      <div
        className={`absolute ${border} ${selectedStyle} ${background} ${slot.occupied_by && !byMe ? lockedSlotStyle : openSlotStyle} flex flex-col justify-center items-center rounded-main top-0 bottom-0 left-0 right-0 transition-all gap-[--spacing-1]`}
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
