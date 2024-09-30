import { Slot as SlotType } from "@/types/EditService";
import { User } from "@/types/GroupService";
import Slot from "./Slot";

export default function SlotEditor({
  slots,
  me,
}: {
  slots: SlotType[];
  me: User;
}) {
  return (
    <>
      <div className="flex">
        {slots.map((slot, key) => (
          <Slot key={key} slot={slot} me={me} />
        ))}
      </div>
    </>
  );
}
