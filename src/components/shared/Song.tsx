import { useState, useRef } from "react";
import { IconKey } from "@/types/theme";
import Button from "@/components/shared/Button";
import Icon from "./Icon";

export default function Song({
  name,
  author,
  img,
  buttonName,
  buttonIcon,
  buttonOnClick,
  audio_src
}: {
  name: string;
  author: string;
  img: string;
  buttonName: string;
  buttonIcon: IconKey;
  buttonOnClick: () => void;
  audio_src: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="flex w-full justify-between items-center border-purple-light rounded-main p-[--spacing-5] border-[1px] bg-purple-very-dark hover:cursor-pointer group"
      onClick={handlePlayPause} // Click to play or pause the song
    >
      <Cover img={img} isPlaying={isPlaying} />
      <div className="text-left flex-1 pl-[--spacing-4]">
        <div className="fs-9 font-bold text-pink-very-light pb-[--spacing-2]">
          {name}
        </div>
        <div className="fs-10 text-purple-light">{author}</div>
      </div>

      {/* Delete button */}
      <div className="pr-[--spacing-4]">
        <Button
          text={buttonName}
          iconName={buttonIcon}
          onClick={buttonOnClick}
        />
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src={audio_src} />
    </div>
  );
}

const Cover = ({ img, isPlaying }: { img: string; isPlaying: boolean }) => {
  const base = "absolute top-0 left-0 right-0 bottom-0 rounded-[99px]";

  return (
    <div className="h-[75px] relative aspect-square group-hover:cursor-pointer">
      {/* Overlay that appears on hover or when isPlaying is true */}
      <div
        className={`
          ${base} bg-purple z-[11] bg-opacity-75 flex items-center justify-center
          transition-opacity duration-300 ease-in-out
          ${isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      >
        <Icon name={isPlaying ? "pause" : "play"} color="pink-very-light" />
      </div>
      {/* Image */}
      <img src={img} className={`${base} object-cover z-[10]`} />
    </div>
  );
};
