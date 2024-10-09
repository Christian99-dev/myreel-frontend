import { useState, useRef, useEffect } from "react";
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
  audio_src,
  isPlaying,
  onPlayPause
}: {
  name: string;
  author: string;
  img: string;
  buttonName: string;
  buttonIcon: IconKey;
  buttonOnClick: () => void;
  audio_src: string;
  isPlaying: boolean;
  onPlayPause: () => void; // Function to toggle play/pause state
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle audio play/pause based on external isPlaying prop
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div
      className="flex w-full justify-between items-center border-purple-light rounded-main p-[--spacing-5] border-[1px] bg-purple-very-dark group"
    >
      {/* Cover Bereich mit Cursor-Pointer und group-hover Effekten */}
      <div className="cursor-pointer hover:cursor-pointer" onClick={onPlayPause}>
        <Cover img={img} isPlaying={isPlaying} />
      </div>
      
      {/* Textbereich mit Cursor-Pointer */}
      <div className="text-left flex-1 pl-[--spacing-4] cursor-pointer hover:cursor-pointer" onClick={onPlayPause}>
        <div className="fs-9 font-bold text-pink-very-light pb-[--spacing-2]">
          {name}
        </div>
        <div className="fs-10 text-purple-light">{author}</div>
      </div>

      {/* Delete Button mit eigenem Cursor */}
      <div className="pr-[--spacing-4]">
        <Button
          text={buttonName}
          iconName={buttonIcon}
          onClick={buttonOnClick}
          // className="cursor-auto" // Sicherstellen, dass der Button den eigenen Cursor verwendet
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
      {/* Overlay, das bei Hover oder wenn isPlaying true ist, angezeigt wird */}
      <div
        className={`
          ${base} bg-purple z-[11] bg-opacity-75 flex items-center justify-center
          transition-opacity duration-300 ease-in-out
          ${isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      >
        <Icon name={isPlaying ? "pause" : "play"} color="pink-very-light" onlyCursor={true} />
      </div>
      {/* Bild */}
      <img src={img} className={`${base} h-full object-cover z-[10]`} alt={`${name} Cover`} />
    </div>
  );
};
