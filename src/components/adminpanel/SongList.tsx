import { useState } from "react";
import { SongService } from "@/services/backend/SongService";
import { Song } from "@/types/SongService";
import SongComponent from "@/components/shared/Song";

export default function SongList({ songs, onSuccessfullDelete }: { songs: Song[], onSuccessfullDelete: () => void }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const songService = new SongService();

  const handlePlayPause = (song_id: number) => {
    setCurrentlyPlaying(prev => (prev === song_id ? null : song_id));
  };

  return songs.map(({ name, author, cover_src, song_id, audio_src }) => (
    <SongComponent
      key={song_id}
      audio_src={audio_src}
      name={name}
      author={author}
      img={cover_src}
      isPlaying={currentlyPlaying === song_id} // check if the song is currently playing
      onPlayPause={() => handlePlayPause(song_id)} // handle play/pause click
      buttonIcon="close"
      buttonName="Delete"
      buttonOnClick={() => {
        songService
          .deleteSong(song_id)
          .onSuccess(() => {
            onSuccessfullDelete();
          })
          .onError((_, statuscode) => {
            alert(statuscode);
          });
      }}
    />
  ));
}
