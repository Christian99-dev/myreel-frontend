"use client";
import { useState, useEffect } from "react";
import { FileService } from "@/services/backend/FileService";
import { FileCategory } from "@/types/FileServices";
import Button from "@/components/shared/Button";

export default function DebugFileServices() {
  const fileService = new FileService();

  const [category, setCategory] = useState<FileCategory>("covers");
  const [filename, setFilename] = useState<string>("");
  const [fileURL, setFileURL] = useState<string | null>(null);

  const handleFetchFile = () => {
    if (!filename) {
      alert("Bitte geben Sie einen Dateinamen ein.");
      return;
    }

    fileService
      .getFile(filename, category)
      .onSuccess((blob) => {
        console.log("Datei abgerufen:", blob);
        const url = URL.createObjectURL(blob);
        setFileURL(url);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Abrufen der Datei:", error, statusCode);
        alert(`Fehler beim Abrufen der Datei: ${error}`);
        setFileURL(null);
      });
  };

  // Aufräumen des Blob-URLs beim Komponenten-Unmount
  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }
    };
  }, [fileURL]);

  return (
    <div className="debug-file-services">
      <h2>Debug File Services</h2>

      {/* Eingabefelder */}
      <div>
        <label>Dateityp:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as FileCategory)}
        >
          <option value="covers">Covers</option>
          <option value="demo_slot">Demo Slot</option>
          <option value="edits">Edits</option>
          <option value="occupied_slots">Occupied Slots</option>
          <option value="songs">Songs</option>
        </select>
      </div>

      <div>
        <label>Dateiname:</label>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
      </div>

      {/* Button */}
      <div>
        <Button
          text="Datei abrufen"
          onClick={handleFetchFile}
          theme="light"
          iconPosition="left"
        />
      </div>

      {/* Anzeige der Datei */}
      <div>
        {fileURL && (
          <div>
            <h3>Dateivorschau:</h3>
            {category === "covers" && (
              <img src={fileURL} alt="Cover" style={{ maxWidth: "100%" }} />
            )}
            {(category === "songs" || category === "demo_slot") && (
              <audio controls>
                <source src={fileURL} />
                Ihr Browser unterstützt das Audio-Element nicht.
              </audio>
            )}
            {category === "edits" && (
              <video controls width="600">
                <source src={fileURL} />
                Ihr Browser unterstützt das Video-Tag nicht.
              </video>
            )}
            {/* Für andere Dateitypen eine Download-Option anbieten */}
            {category === "occupied_slots" && (
              <div>
                <a href={fileURL} download={filename}>
                  Datei herunterladen
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
