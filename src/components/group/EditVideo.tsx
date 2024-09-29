import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import Icon from "../shared/Icon";

interface EditVideoProps {
  videoSrc: string;
}

export default function EditVideo({ videoSrc }: EditVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Play/Pause Toggle
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update currentTime as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
    };

    const handleLoadedMetadata = () => {
      const dur = video.duration;
      setDuration(dur);
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  // Handle progress bar click or drag
  const handlePointerDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seek(e);
  };

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        seek(e);
      }
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    () => {
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
    } else {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const seek = (e: MouseEvent | ReactMouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || duration === 0) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let clickX = e.clientX - rect.left;

    // Begrenzen von clickX auf den Bereich der Progress Bar
    clickX = Math.max(0, Math.min(clickX, rect.width));

    const newTime = (clickX / rect.width) * duration;

    // Validierung von newTime
    const validTime = Math.max(0, Math.min(newTime, duration));

    videoRef.current.currentTime = validTime;
    setCurrentTime(validTime);
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

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
        name={isPlaying ? "pause" : "play"}
        color="purple"
        onClick={togglePlayPause}
      />

      {/* Progress Bar */}
      <div className="w-full max-w-lg flex items-center bg-purple bg-opacity-50 mt-[--spacing-2]">
        <div
          className="relative flex-1 h-1 bg-gray-300 rounded-full cursor-pointer"
          ref={progressBarRef}
          onMouseDown={handlePointerDown}
        >
          {/* Progress Line */}
          <div
            className="absolute top-0 left-0 h-1 bg-purple rounded-[99px]"
            style={{
              width: duration ? `${(currentTime / duration) * 100}%` : "0%",
            }}
          ></div>

          {/* Progress Dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple rounded-[99px] transform -translate-x-1/2 cursor-pointer progress-dot"
            style={{
              left: duration ? `${(currentTime / duration) * 100}%` : "0%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
