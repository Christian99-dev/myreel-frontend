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
    console.log("togglePlayPause: Aufgerufen");
    if (!videoRef.current) {
      console.log("togglePlayPause: videoRef.current ist null");
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      console.log("togglePlayPause: Video pausiert");
    } else {
      videoRef.current.play();
      console.log("togglePlayPause: Video abgespielt");
    }
    setIsPlaying(!isPlaying);
    console.log(`togglePlayPause: isPlaying gesetzt auf ${!isPlaying}`);
  };

  // Update currentTime as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log("useEffect: videoRef.current ist null");
      return;
    }

    const handleTimeUpdate = () => {
      if(!videoRef.current) return
      const time = videoRef.current?.currentTime
      console.log(`handleTimeUpdate: currentTime aktualisiert auf ${time}`);
      setCurrentTime(time);
    };

    const handleLoadedMetadata = () => {
      const dur = video.duration;
      setDuration(dur);
      console.log(`handleLoadedMetadata: duration gesetzt auf ${dur}`);
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      console.log("handleVideoEnded: Video beendet. isPlaying auf false gesetzt und currentTime auf 0 zurückgesetzt.");
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleVideoEnded);

    console.log("useEffect: Event-Listener hinzugefügt");

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleVideoEnded);
      console.log("useEffect Cleanup: Event-Listener entfernt");
    };
  }, []);

  // Handle progress bar click or drag
  const handlePointerDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    console.log("handlePointerDown: Maus gedrückt auf Progress Bar");
    setIsDragging(true);
    console.log(`handlePointerDown: isDragging auf true gesetzt`);
    seek(e);
  };

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        console.log("handlePointerMove: Maus bewegt sich während Dragging");
        seek(e);
      } else {
        console.log("handlePointerMove: isDragging ist false. Ignoriert.");
      }
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    () => {
      if (isDragging) {
        setIsDragging(false);
        console.log("handlePointerUp: isDragging auf false gesetzt");
      } else {
        console.log("handlePointerUp: isDragging war bereits false");
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      console.log("useEffect: mousemove und mouseup Listener hinzugefügt");
    } else {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      console.log("useEffect: mousemove und mouseup Listener entfernt");
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      console.log("useEffect Cleanup: mousemove und mouseup Listener entfernt");
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const seek = (e: MouseEvent | ReactMouseEvent<HTMLDivElement>) => {
    console.log("seek: Aufgerufen");
    if (!progressBarRef.current) {
      console.log("seek: progressBarRef.current ist null");
      return;
    }
    if (!videoRef.current) {
      console.log("seek: videoRef.current ist null");
      return;
    }
    if (duration === 0) {
      console.log("seek: duration ist 0");
      return;
    }

    const rect = progressBarRef.current.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    console.log(`seek: Ursprünglicher clickX=${clickX}`);

    // Begrenzen von clickX auf den Bereich der Progress Bar
    clickX = Math.max(0, Math.min(clickX, rect.width));
    console.log(`seek: Begrenzter clickX=${clickX}`);

    const newTime = (clickX / rect.width) * duration;
    console.log(`seek: newTime berechnet als ${newTime}`);

    // Validierung von newTime
    const validTime = Math.max(0, Math.min(newTime, duration));
    console.log(`seek: validTime=${validTime}`);

    videoRef.current.currentTime = validTime;
    console.log(`seek: video.currentTime auf ${validTime} gesetzt`);

    setCurrentTime(validTime);
    console.log(`seek: currentTime State aktualisiert auf ${validTime}`);
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
