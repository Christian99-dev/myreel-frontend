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
  // Berechnung der Gesamtdauer
  const totalDuration = slots.reduce(
    (total, slot) => total + (slot.end_time - slot.start_time),
    0
  );

  const backgroundColors = [
    "to-slot-theme-1",
    "to-slot-theme-2",
    "to-slot-theme-3",
    "to-slot-theme-4",
    "to-slot-theme-5",
    "to-slot-theme-6",
    "to-slot-theme-7",
  ];

  const strokeColors = [
    "stroke-slot-theme-1",
    "stroke-slot-theme-2",
    "stroke-slot-theme-3",
    "stroke-slot-theme-4",
    "stroke-slot-theme-5",
    "stroke-slot-theme-6",
    "stroke-slot-theme-7",
  ];

  return (
    <>
      <div className="flex w-[70%]">
        {slots.map((slot, key) => {
          const { slot_id } = slot;
          // Berechnung der Dauer des einzelnen Slots
          const slotDuration = slot.end_time - slot.start_time;

          // Berechnung des prozentualen Anteils an der Gesamtdauer
          const widthPercentage = (slotDuration / totalDuration) * 100;

          return (
            <Slot
              key={key}
              slot={slot}
              me={me}
              widthPercentage={widthPercentage}
              backgroundColor={backgroundColors[slot_id % backgroundColors.length]}
              strokeColor={strokeColors[slot_id % strokeColors.length]}
            />
          );
        })}
      </div>
    </>
  );
}
