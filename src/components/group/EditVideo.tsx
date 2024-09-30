import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import Icon from "../shared/Icon";

export default function EditVideo({
  videoSrc,
  className,
}: {
  videoSrc: string;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
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

  // Handle progress bar click or drag
  const handlePointerDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seek(e.nativeEvent);
  };

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        seek(e);
      }
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

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


  return (
    <div className={`${className} w-full mt-4 flex flex-col items-center`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="h-[500px] aspect-[9/16] rounded-main shadow-main mb-5 object-cover"
        onTimeUpdate={(video) => {
          if(video.currentTarget.currentTime == 0) return 
          setCurrentTime(video.currentTarget.currentTime)
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
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
