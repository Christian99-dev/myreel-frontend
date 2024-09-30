import Modal, { ModalHandle, Slide } from "../shared/Modal";
import { useRef } from "react";
import LoadingText from "../shared/LoadingText";
import Icon from "../shared/Icon";

export default function GoLiveModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <Modal title="Preview Slot" ref={modalRef} open={open} onClose={onClose}>
      <Slide className="text-center">
        <h1 className="fs-10 text-purple-light font-medium">
          <LoadingText text="Edit wird bearbeitet" />
        </h1>
        <Icon
          floating={true}
          name="bigHero"
          color="purple-light"
          size={1}
          strokeWidth={4}
        />
      </Slide>
    </Modal>
  );
}
