import { Slot as SlotType } from "@/types/EditService";
import FileUploadBox from "../shared/FileUpload";
import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  useCallback,
} from "react";
import Icon from "../shared/Icon";
import ReactPlayer from "react-player";

export default function SlotEditor({ slot }: { slot: SlotType }) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(slot.video_src);
  const playerRef = useRef<ReactPlayer | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Play/Pause Toggle
  const togglePlayPause = () => {
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
    if (!progressBarRef.current || duration === 0) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let clickX = e.clientX - rect.left;

    // Begrenzen von clickX auf den Bereich der Progress Bar
    clickX = Math.max(0, Math.min(clickX, rect.width));

    const newTime = (clickX / rect.width) * duration;

    // Validierung von newTime
    const validTime = Math.max(0, Math.min(newTime, duration));

    setCurrentTime(validTime);
    if (playerRef.current) {
      playerRef.current.seekTo(validTime, "seconds");
    }
  };

  // Verwende useEffect, um eine URL für die Videodatei zu erstellen und den Speicher freizugeben, wenn die Komponente unmontiert wird.
  useEffect(() => {
    if (videoFile) {
      const fileUrl = URL.createObjectURL(videoFile);
      setVideoSrc(fileUrl);

      // Bereinige die URL, wenn die Komponente unmontiert wird oder die Datei geändert wird.
      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    } else {
      setVideoSrc(undefined);
    }
  }, [videoFile]);

  useEffect(() => {
    if (slot.video_src) {
      setVideoSrc(slot.video_src);
    } else {
      setVideoSrc(undefined);
    }
    setVideoFile(null);
  }, [slot]);

  const handleProgress = useCallback(
    (state: { playedSeconds: number }) => {
      if (!isDragging) {
        // Verwende requestAnimationFrame für flüssigere Updates
        requestAnimationFrame(() => {
          setCurrentTime(state.playedSeconds);
        });
      }
    },
    [isDragging]
  );

  const handleDuration = useCallback((dur: number) => {
    setDuration(dur);
  }, []);

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      {/* Button zum Entfernen des Videos */}
      <div className="flex justify-end gap-4 mb-4">
        <Icon name="thrash" color="purple" onClick={() => setVideoFile(null)} />
      </div>

      {/** Video oder Drag & Drop */}
      <div className="relative aspect-video w-[700px] mb-[--spacing-3]">
        {/* Videoanzeige */}
        {videoSrc && (
          <ReactPlayer
            ref={playerRef}
            url={videoSrc}
            playing={isPlaying}
            controls={false}
            width="100%"
            height="100%"
            onProgress={handleProgress}
            onDuration={handleDuration}
            progressInterval={100}
            muted={true}
            className="rounded-main shadow-main object-cover absolute top-0 left-0 right-0 bottom-0 z-20"
          />
        )}

        {/* Dateiupload-Box */}
        <div className="top-0 left-0 right-0 bottom-0 absolute z-10">
          <FileUploadBox
            label="Video hochladen"
            accept="video/*"
            fileName={videoFile?.name}
            onFileSelected={(file: File) => setVideoFile(file)}
          />
        </div>
      </div>

      {videoSrc && (
        <>
          {/* Play/Pause Button */}
          <Icon
            size={5}
            name={isPlaying ? "pause" : "play"}
            color="purple"
            onClick={togglePlayPause}
          />

          {/* Progress Bar */}
          <div className="w-[70%] flex items-center bg-purple bg-opacity-50 mt-[--spacing-2]">
            <div
              className="relative flex-1 h-1 bg-gray-300 rounded-[99px] cursor-pointer"
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
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple rounded-[99px] transition-all duration-100 ease-linear"
                style={{
                  left: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
