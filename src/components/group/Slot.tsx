import { Slot as SlotType } from "@/types/EditService";
import { User } from "@/types/GroupService";

export default function Slot({ slot, me }: { slot: SlotType, me: User }) {
  return <div className="size-4 bg-purple"></div>;
}
