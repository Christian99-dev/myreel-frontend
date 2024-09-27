import { useEffect, useRef, useState } from "react";
import Modal, { ModalHandle, Slide } from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import Button from "../shared/Button";
import { UserService } from "@/services/backend/UserService";
import SongList from "../adminpanel/SongList";
import { Song } from "@/types/SongService";
import { SongService } from "@/services/backend/SongService";

export default function CreateEditModal({
  open,
  onClose,
  userid,
}: {
  open: boolean;
  onClose: () => void;
  userid: number;
}) {
  const songService = new SongService();
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const userService = new UserService();
  const modalRef = useRef<ModalHandle>(null);
  const [email, setEmail] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song| null>(null)

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
    <Modal
      title="Freunde Einladen"
      ref={modalRef}
      open={open}
      onClose={onClose}
    >
      <Slide>
        <p>Wähle einen song aus</p>
        {songs ? (
          <div className="flex flex-col max-h-[300px] overflow-auto w-full gap-[--spacing-2] ios-scrollbar">
            <SongList buttonName="Auswählen" buttonIcon="rocket" songs={songs} onButtonClick={(song_id) => {}} />
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </Slide>
    </Modal>
  );
}
