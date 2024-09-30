import Modal, { ModalHandle, Slide } from "../shared/Modal";
import Button from "@/components/shared/Button";
import { EditSlotService } from "@/services/backend/SlotService";
import { useEffect, useRef, useState } from "react";
import LoadingText from "../shared/LoadingText";
import Icon from "../shared/Icon";
import { PreviewSlotRequest } from "@/types/SlotService";

export default function GoLiveModal({
  open,
  onClose,
  previewSlotRequest,
  editid,
  slotid,
}: {
  open: boolean;
  onClose: () => void;
  previewSlotRequest: PreviewSlotRequest | null;
  editid: number;
  slotid: number;
}) {
  const [url, setUrl] = useState("");
  const editSlotService = new EditSlotService();
  const modalRef = useRef<ModalHandle>(null);

  useEffect(() => {
    if (!previewSlotRequest) return;
    setUrl("");
    modalRef.current?.slideTo(0);
    editSlotService
      .previewSlot(editid, slotid, previewSlotRequest)
      .onError(() => {
        alert("Etwas ist schiefgelaufen!");
        onClose()
      })
      .onSuccess((blob) => {
        setUrl(URL.createObjectURL(blob));
        modalRef.current?.slideTo(1);
      });
  }, [previewSlotRequest]);

  return (
    <Modal title="Preview Slot" ref={modalRef} open={open} onClose={onClose}>
      <Slide className="text-center">
        <h1 className="fs-10 text-purple-light font-medium">
          <LoadingText text="Lade Preview" />
        </h1>
        <Icon
          floating={true}
          name="bigHero"
          color="purple-light"
          size={1}
          strokeWidth={4}
        />
      </Slide>

      <Slide className="text-center">
        <video controls src={url} className="aspect-[9/16] h-[600px]" />
      </Slide>
    </Modal>
  );
}
