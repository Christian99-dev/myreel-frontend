import { Slot as SlotType } from "@/types/EditService";

export default function SlotEditor({slot} : {slot: SlotType}) {
    console.log(slot)
    return <div>{slot.start_time}</div>
}