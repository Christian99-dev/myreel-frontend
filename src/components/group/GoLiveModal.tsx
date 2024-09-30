import Modal, { ModalHandle, Slide } from "../shared/Modal";
import Button from "@/components/shared/Button";
import { EditService } from "@/services/backend/EditService";
import { useRef } from "react";
import LoadingText from "../shared/LoadingText";
import Icon from "../shared/Icon";

export default function GoLiveModal({
  open,
  onClose,
  editId,
}: {
  open: boolean;
  onClose: () => void;
  editId: number | null | undefined;
}) {
  const editService = new EditService();
  const modalRef = useRef<ModalHandle>(null);

  return (
    <Modal title="Edit Hochladen " ref={modalRef} open={open} onClose={onClose}>
      <Slide>
        <div className="flex flex-row gap-[--spacing-4]">
          <Button
            iconName="rocket"
            text="Edit Hochladen"
            theme="dark"
            onClick={() => {
              if (!editId) {
                onClose();
                return;
              }
              modalRef.current?.slideTo(1);
              editService
                .goLive(editId)
                .onError(() => {
                  alert("Etwas ist schiefgelaufen");
                })
                .onSuccess(() => {
                  modalRef.current?.slideTo(2);
                });
            }}
          />
          <Button iconName="close" text="Abbrechen" onClick={() => onClose()} />
        </div>
      </Slide>

      <Slide className="text-center">
        <h1 className="fs-10 text-purple-light font-medium">
          <LoadingText text="Bitte warten" />
        </h1>
        <Icon
          floating={true}
          name="bigHero"
          color="purple-light"
          size={1}
          strokeWidth={4}
        />
      </Slide>

      {/** Einloggen */}
      <Slide className="text-center">
        <h1 className="fs-8 text-purple-light font-medium">
          Erfolgreich Hochgeladen!
        </h1>
        <Button
          text="Weiter Basteln"
          onClick={() => {
            modalRef.current?.slideTo(0);
            onClose();
          }}
        />
      </Slide>
    </Modal>
  );
}
