import { Slot as SlotType } from "@/types/EditService";
import FileUploadBox from "../shared/FileUpload";
import { useEffect, useState } from "react";
import Icon from "../shared/Icon";

export default function SlotEditor({ slot }: { slot: SlotType }) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

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
      setVideoSrc(null);
    }
  }, [videoFile]);

  return (
    <div>
      <div className="flex justify-end gap-[--spacing-5] mb-[--spacing-5]">
        {/* Button zum Entfernen des Videos */}
        <Icon name="thrash" color="purple" onClick={() => setVideoFile(null)} />
      </div>
      <div className="relative aspect-video w-[700px]">
        {/* Videoanzeige */}
        {videoSrc && (
          <video
            src={videoSrc}
            controls
            className="absolute top-0 bottom-0 left-0 right-0 bg-green rounded-main object-cover z-[13]"
          />
        )}

        {/* Dateiupload-Box */}
        <div className="top-0 left-0 right-0 bottom-0 absolute z-[12]">
          <FileUploadBox
            label="Video hochladen"
            accept="video/*"
            fileName={videoFile?.name}
            onFileSelected={(file: File) => setVideoFile(file)}
          />
        </div>
      </div>
    </div>
  );
}
