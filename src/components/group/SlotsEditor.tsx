import { Slot as SlotType } from "@/types/EditService";
import { User } from "@/types/GroupService";
import Slot from "./Slot";
import { useEffect, useMemo, useState } from "react";
import Button from "../shared/Button";
import SlotEditor from "./SlotEditor";
import GoLiveModal from "./GoLiveModal";

export default function SlotsEditor({
  slots,
  me,
  selectedEditId,
  isLive,
}: {
  slots: SlotType[];
  me: User;
  selectedEditId: number | null | undefined;
  isLive: boolean;
}) {
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [goLiveModal, setGoLiveModal] = useState(false);
  const allSlotsAreOccupied = slots.every(
    (slot) => slot.occupied_by !== null && slot.occupied_by !== undefined
  );

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

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedEditId]);

  return (
    <>
      <GoLiveModal
        open={goLiveModal}
        onClose={() => setGoLiveModal(false)}
        editId={selectedEditId}
      />
      {allSlotsAreOccupied && !isLive && (
        <div className="flex flex-col items-center gap-[--spacing-8] mb-[--spacing-10]">
          <h2 className="font-medium fs-9 text-purple-light text-center flex flex-col">
            {me.role === "creator"
              ? "Du kannst das Reel jetzt auf Instagram hochladen!"
              : "Ein Admin kann das Reel jetzt hochladen"}
          </h2>
          {me.role === "creator" && (
            <Button
              iconName="rocket"
              text="Hochladen"
              onClick={() => setGoLiveModal(true)}
            />
          )}
        </div>
      )}
      {isLive && (
        <div className="flex flex-col items-center gap-[--spacing-8] mb-[--spacing-10]">
          Edit ist Hochgeladen!
        </div>
      )}
      <div className="flex w-[70%]">
        {[...slots].sort((a, b) => a.start_time - b.start_time).map((slot, key) => {
          const { slot_id } = slot;
          // Berechnung der Dauer des einzelnen Slots
          const slotDuration = slot.end_time - slot.start_time;

          // Berechnung des prozentualen Anteils an der Gesamtdauer
          const widthPercentage = (slotDuration / totalDuration) * 100;

          return (
            <Slot
              selected={selectedSlot?.slot_id === slot.slot_id}
              key={key}
              slot={slot}
              me={me}
              widthPercentage={widthPercentage}
              backgroundColor={
                backgroundColors[slot_id % backgroundColors.length]
              }
              strokeColor={strokeColors[slot_id % strokeColors.length]}
              onClick={() => {
                if (slot === selectedSlot) {
                  setSelectedSlot(null);
                } else {
                  setSelectedSlot(slot);
                }
              }}
            />
          );
        })}
      </div>
      <div className="py-[--spacing-10] text-center">
        {!selectedSlot && !isLive && (
          <h2 className="font-medium fs-7 text-purple-light opacity-50">
            Wähle einen slot aus
          </h2>
        )}

        {selectedSlot && !isLive && selectedEditId && (
          <SlotEditor
            edit_id={selectedEditId}
            slot={selectedSlot}
            occupied_by_me={selectedSlot.occupied_by?.user_id === me.id}
          />
        )}
      </div>
    </>
  );
}
