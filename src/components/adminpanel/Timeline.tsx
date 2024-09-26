// components/shared/Timeline.tsx
import React, { useRef } from "react";

interface TimelineProps {
  duration: number;
  breakpoints: number[];
  setBreakpoints: React.Dispatch<React.SetStateAction<number[]>>;
  currentTime: number;
  onSeek: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timeline: React.FC<TimelineProps> = ({
  duration,
  breakpoints,
  setBreakpoints,
  currentTime,
  onSeek,
  isPlaying,
  setIsPlaying,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Nur hinzufügen bei MouseDown, nicht bei Drag
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const timelineWidth = rect.width;
      const time = (clickX / timelineWidth) * duration;

      setBreakpoints((prevBreakpoints) =>
        [...prevBreakpoints, time].sort((a, b) => a - b)
      );
    }
  };

  const handleBreakpointDrag = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation(); // Verhindert das Auslösen des Timeline MouseDown
    const initialX = e.clientX;

    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return;
    const timelineWidth = rect.width;

    const initialTime = breakpoints[index];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const deltaTime = (deltaX / timelineWidth) * duration;

      setBreakpoints((prevBreakpoints) => {
        const newBreakpoints = [...prevBreakpoints];
        let newTime = initialTime + deltaTime;
        newTime = Math.max(0, Math.min(newTime, duration)); // Beschränke zwischen 0 und Dauer
        newBreakpoints[index] = newTime;
        return newBreakpoints;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handlePlayheadDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const initialX = e.clientX;

    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return;
    const timelineWidth = rect.width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const deltaTime = (deltaX / timelineWidth) * duration;
      let newTime = currentTime + deltaTime;
      newTime = Math.max(0, Math.min(newTime, duration));

      onSeek(newTime);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleRightClickBreakpoint = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Möchtest du diesen Schnittpunkt löschen?"
    );
    if (confirmDelete) {
      setBreakpoints((prevBreakpoints) =>
        prevBreakpoints.filter((_, i) => i !== index)
      );
    }
  };

  const colors = [
    "bg-slot-theme-1",
    "bg-slot-theme-2",
    "bg-slot-theme-3",
    "bg-slot-theme-4",
    "bg-slot-theme-5",
    "bg-slot-theme-6",
    "bg-slot-theme-7",
  ];

  return (
    <div
      ref={timelineRef}
      className="relative w-full cursor-pointer mx-[--spacing-5]"
      onMouseDown={handleTimelineMouseDown}
    >
      {/* Timeline Line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black transform -translate-y-1/2 bg-pink-very-light"></div>

      {/* Breakpoints */}
      {breakpoints.map((bp, index) => {
        const position = (bp / duration) * 100;
        const color = colors[index % colors.length];
        return (
          <div
            key={index}
            onMouseDown={(e) => handleBreakpointDrag(index, e)}
            onContextMenu={(e) => handleRightClickBreakpoint(index, e)}
            className={`absolute top-1/2 size-3 rounded-[99px] cursor-grab transform -translate-x-1/2 -translate-y-1/2 ${color}`}
            style={{
              left: `${position}%`,
            }}
          >
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs">
              {bp.toFixed(2)}s
            </div>
          </div>
        );
      })}

      {/* Playback Marker */}
      <div
        onMouseDown={handlePlayheadDrag}
        className="absolute top-1/2 size-2 bg-pink-very-light rounded-[99px] cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${(currentTime / duration) * 100}%`,
        }}
      >
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-700">
          {currentTime.toFixed(2)}s
        </div>
      </div>
    </div>
  );
};

export default Timeline;
