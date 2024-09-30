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
  const [draggingDot, setDraggingDot] = useState<'start' | 'end' | null>(null);
  
  const slotDuration = slot.end_time - slot.start_time;

  const [selectedStartTime, setSelectedStartTime] = useState<number>(slot.occupied_start_time || 0);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(
    slot.occupied_endtime || slotDuration
  );

  // Play/Pause Toggle
  const togglePlayPause = () => {
    if (!isPlaying) {
      // Wenn das Video gestartet wird, setze die Startzeit
      if (playerRef.current) {
        playerRef.current.seekTo(selectedStartTime, "seconds");
        setCurrentTime(selectedStartTime);
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar click or drag
  const handlePointerDown = (
    e: ReactMouseEvent<HTMLDivElement>,
    dot: 'start' | 'end'
  ) => {
    e.stopPropagation(); // Verhindere das Auslösen anderer Event-Handler
    setIsDragging(true);
    setDraggingDot(dot);
    seek(e.nativeEvent, dot);
  };

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && draggingDot && progressBarRef.current && duration > 0) {
        const rect = progressBarRef.current.getBoundingClientRect();
        let clickX = e.clientX - rect.left;

        // Begrenzen von clickX auf den Bereich der Progress Bar
        clickX = Math.max(0, Math.min(clickX, rect.width));

        const newTime = (clickX / rect.width) * duration;
        const slotDuration = slot.end_time - slot.start_time;

        if (draggingDot === 'start') {
          // Stelle sicher, dass newStartTime + slotDuration nicht die Dauer überschreitet
          const constrainedStart = Math.max(0, Math.min(newTime, duration - slotDuration));
          setSelectedStartTime(constrainedStart);
          setSelectedEndTime(constrainedStart + slotDuration);
        } else if (draggingDot === 'end') {
          // Stelle sicher, dass newEndTime - slotDuration nicht negativ ist
          const constrainedEnd = Math.min(duration, Math.max(newTime, slotDuration));
          setSelectedEndTime(constrainedEnd);
          setSelectedStartTime(constrainedEnd - slotDuration);
        }
      }
    },
    [isDragging, draggingDot, duration, slotDuration]
  );

  const handlePointerUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDraggingDot(null);
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

  const seek = (e: MouseEvent | ReactMouseEvent<HTMLDivElement>, dot?: 'start' | 'end') => {
    if (!progressBarRef.current || duration === 0) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let clickX = e.clientX - rect.left;

    // Begrenzen von clickX auf den Bereich der Progress Bar
    clickX = Math.max(0, Math.min(clickX, rect.width));

    const newTime = (clickX / rect.width) * duration;
    const slotDuration = slot.end_time - slot.start_time;

    if (dot === 'start') {
      const constrainedStart = Math.max(0, Math.min(newTime, duration - slotDuration));
      setSelectedStartTime(constrainedStart);
      setSelectedEndTime(constrainedStart + slotDuration);
    } else if (dot === 'end') {
      const constrainedEnd = Math.min(duration, Math.max(newTime, slotDuration));
      setSelectedEndTime(constrainedEnd);
      setSelectedStartTime(constrainedEnd - slotDuration);
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
    setSelectedStartTime(slot.occupied_start_time || 0);
    setSelectedEndTime(slot.occupied_endtime || (slot.occupied_start_time || 0) + slotDuration);
    setVideoSrc(slot.video_src || undefined);
    setVideoFile(null);
  }, [slot, slotDuration]);

  const handleProgress = useCallback(
    (state: { playedSeconds: number }) => {
      if (!isDragging) {
        // Verwende requestAnimationFrame für flüssigere Updates
        requestAnimationFrame(() => {
          setCurrentTime(state.playedSeconds);

          // Überprüfe, ob die aktuelle Zeit das Endziel erreicht oder überschritten hat
          if (state.playedSeconds >= selectedEndTime) {
            setIsPlaying(false);
            if (playerRef.current) {
              playerRef.current.seekTo(selectedStartTime, "seconds");
              setCurrentTime(selectedStartTime);
            }
          }
        });
      }
    },
    [isDragging, selectedEndTime, selectedStartTime]
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
          <div className="w-[70%] flex items-center bg-purple-light bg-opacity-50 mt-[--spacing-2]">
            <div
              className="relative flex-1 h-[2px] bg-gray-300 rounded-[99px] cursor-pointer"
              ref={progressBarRef}
              onMouseDown={(e) => seek(e.nativeEvent)}
            >
              {/* Progress Line */}
              <div
                className="absolute top-0 left-0 h-[2px] bg-purple-light rounded-[99px] z-10"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              ></div>

              {/* Start Progress Dot */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-light rounded-[99px] transition-all duration-100 ease-linear z-20 cursor-pointer"
                style={{
                  left: duration ? `${(selectedStartTime / duration) * 100}%` : "0%",
                }}
                onMouseDown={(e) => handlePointerDown(e, 'start')}
              ></div>

              {/* End Progress Dot */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-light rounded-[99px] transition-all duration-100 ease-linear z-20 cursor-pointer"
                style={{
                  left: duration
                    ? `${(selectedEndTime / duration) * 100}%`
                    : "0%",
                }}
                onMouseDown={(e) => handlePointerDown(e, 'end')}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
