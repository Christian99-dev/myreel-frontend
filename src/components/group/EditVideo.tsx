import {
  useRef,
  useState,
  useEffect,
  PointerEvent as ReactPointerEvent,
} from "react";
import Icon from "../shared/Icon";

interface EditVideoProps {
  videoSrc: string;
}

export default function EditVideo({ videoSrc }: EditVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="h-[500px] aspect-[9/16] rounded-main shadow-main mb-5 object-cover"
      />

      {/* Play/Pause Button */}
      <Icon
        size={5}
        onClick={() => {}}
        name={isPlaying ? "pause" : "play"}
        color="purple"
      />
    </div>
  );
}
