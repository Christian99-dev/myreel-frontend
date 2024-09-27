import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Modal, { ModalHandle, Slide } from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import Button from "../shared/Button";
import { UserService } from "@/services/backend/UserService";
import SongList from "../adminpanel/SongList";
import { Song } from "@/types/SongService";
import { SongService } from "@/services/backend/SongService";
import { EditService } from "@/services/backend/EditService";
import Icon from "../shared/Icon";
import LoadingText from "../shared/LoadingText";

export default function CreateEditModal({
  open,
  onClose,
  groupid,
  setActiveEditId,
}: {
  open: boolean;
  onClose: () => void;
  groupid: string;
  setActiveEditId: Dispatch<SetStateAction<number | null | undefined>>;
}) {
  const songService = new SongService();
  const [editName, setEditName] = useState("");
  const [songs, setSongs] = useState<Song[] | null>(null);
  const editService = new EditService();
  const modalRef = useRef<ModalHandle>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  useEffect(() => {
    if (open) {
      songService
        .listSongs()
        .onSuccess((res) => {
          setSongs(res.songs);
        })
        .onError((_, statuscode) => {
          alert(statuscode);
        });
    }
  }, [open]);

  return (
    <Modal title="Edit Erstellen" ref={modalRef} open={open} onClose={onClose}>
      <Slide>
        {songs ? (
          <>
            <p className="fs-10 font-medium text-purple-light">Wähle einen song aus</p>
            <div className="flex flex-col max-h-[300px] overflow-auto w-full gap-[--spacing-2] ios-scrollbar">
              <SongList
                buttonName="Auswählen"
                buttonIcon="rocket"
                songs={songs}
                onButtonClick={(song) => {
                  setSelectedSong(song);
                  modalRef.current?.slideTo(1);
                }}
              />
            </div>
          </>
        ) : (
          <h1 className="fs-10 text-purple-light font-medium">
            <LoadingText text="Lade Songs" />
          </h1>
        )}
      </Slide>
      <Slide>
        <Input
          value={editName}
          label="Editname"
          placeholder="Hier Editname eingeben"
          onChange={(e) => setEditName(e.target.value)}
        />
        <Button text="Weiter" onClick={() => modalRef.current?.slideTo(2)} />
      </Slide>

      <Slide>
        {selectedSong && (
          <>
            <p className="text-center">
              Möchtest du{" "}
              <span className="fs-9 font-bold text-purple-light">
                {selectedSong.name}
              </span>{" "}
              von{" "}
              <span className="fs-9 font-medium text-pink-very-light">
                {selectedSong.author}
              </span>{" "}
              <br /> für dein neues Edit{" "}
              <span className="fs-9 font-medium text-pink-very-light">
                {editName}
              </span>{" "}
              nehmen ?
            </p>
            <div className="flex gap-[--spacing-3]">
              <Button
                text="Auswählen"
                iconName="rocket"
                onClick={() => {
                  modalRef.current?.slideTo(3);
                  editService
                    .createEdit({
                      song_id: selectedSong.song_id,
                      groupid: groupid,
                      edit_name: editName,
                    })
                    .onError((_, statuscode) => {
                      alert(statuscode);
                    })
                    .onSuccess(({ edit_id }) => {
                      modalRef.current?.slideTo(0);
                      setActiveEditId(edit_id);
                      setEditName("");
                      onClose();
                    });
                }}
              />
              <Button
                text="Abbrechen"
                theme="dark"
                iconName="close"
                onClick={() => {
                  setSelectedSong(null);
                  modalRef.current?.slideTo(0);
                  onClose();
                }}
              />
            </div>
          </>
        )}
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
    </Modal>
  );
}
