import { useState } from "react";
import { Song } from "@/types/SongService";
import SongComponent from "@/components/shared/Song";
import { IconKey } from "@/types/theme";

export default function SongList({
  songs,
  onButtonClick,
  buttonIcon,
  buttonName,
}: {
  songs: Song[];
  onButtonClick: (song_id: number) => void;
  buttonIcon: IconKey;
  buttonName: string;
}) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const handlePlayPause = (song_id: number) => {
    setCurrentlyPlaying((prev) => (prev === song_id ? null : song_id));
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
      buttonIcon={buttonIcon}
      buttonName={buttonName}
      buttonOnClick={() => onButtonClick(song_id)}
    />
  ));
}
