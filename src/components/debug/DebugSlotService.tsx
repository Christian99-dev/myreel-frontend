"use client";
import { useState, useEffect } from "react";
import { EditSlotService } from "@/services/backend/SlotService";
import {
  AddSlotResponse,
  ChangeSlotResponse,
  DeleteSlotResponse,
} from "@/types/SlotService";
import Button from "@/components/shared/Button";

export default function DebugEditSlotServices() {
  const editSlotService = new EditSlotService();

  // State-Variablen für Eingaben
  const [editId, setEditId] = useState<number>(0);
  const [slotId, setSlotId] = useState<number>(0);
  const [occupiedSlotId, setOccupiedSlotId] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // State-Variablen für Antworten
  const [addSlotResponse, setAddSlotResponse] = useState<AddSlotResponse | null>(
    null
  );
  const [changeSlotResponse, setChangeSlotResponse] = useState<ChangeSlotResponse | null>(
    null
  );
  const [deleteSlotResponse, setDeleteSlotResponse] = useState<DeleteSlotResponse | null>(
    null
  );
  const [previewVideoURL, setPreviewVideoURL] = useState<string>("");

  // JWT-Token
  const [jwt, setJwt] = useState<string>("");

  // Laden des JWT aus dem localStorage
  const loadJwt = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setJwt(token);
    }
  };

  useEffect(() => {
    loadJwt();
  }, []);

  const handleAddSlot = () => {
    if (!videoFile) {
      alert("Bitte wählen Sie eine Videodatei aus.");
      return;
    }

    const data = {
      start_time: startTime,
      end_time: endTime,
      video_file: videoFile,
    };

    editSlotService
      .addSlot(editId, slotId, data)
      .onSuccess((response) => {
        console.log("Slot hinzugefügt:", response);
        setAddSlotResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Hinzufügen des Slots:", error, statusCode);
        alert(`Fehler beim Hinzufügen des Slots: ${error}`);
      });
  };

  const handleDeleteSlot = () => {
    if (!occupiedSlotId) {
      alert("Bitte geben Sie eine Occupied Slot ID an.");
      return;
    }

    editSlotService
      .deleteSlot(editId, occupiedSlotId)
      .onSuccess((response) => {
        console.log("Slot gelöscht:", response);
        setDeleteSlotResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Löschen des Slots:", error, statusCode);
        alert(`Fehler beim Löschen des Slots: ${error}`);
      });
  };

  const handleChangeSlot = () => {
    if (!videoFile) {
      alert("Bitte wählen Sie eine Videodatei aus.");
      return;
    }

    const data = {
      start_time: startTime,
      end_time: endTime,
      video_file: videoFile,
    };

    editSlotService
      .changeSlot(editId, occupiedSlotId, data)
      .onSuccess((response) => {
        console.log("Slot geändert:", response);
        setChangeSlotResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Ändern des Slots:", error, statusCode);
        alert(`Fehler beim Ändern des Slots: ${error}`);
      });
  };

  const handlePreviewSlot = () => {
    if (!videoFile) {
      alert("Bitte wählen Sie eine Videodatei aus.");
      return;
    }

    const data = {
      start_time: startTime,
      end_time: endTime,
      video_file: videoFile,
    };

    editSlotService
      .previewSlot(editId, slotId, data)
      .onSuccess((blob) => {
        const url = URL.createObjectURL(blob);
        setPreviewVideoURL(url);
        alert("Vorschau erstellt.");
      })
      .onError((error, statusCode) => {
        console.error("Fehler bei der Vorschau des Slots:", error, statusCode);
        alert(`Fehler bei der Vorschau des Slots: ${error}`);
      });
  };

  // Aufräumen des Blob-URLs beim Komponenten-Unmount
  useEffect(() => {
    return () => {
      if (previewVideoURL) {
        URL.revokeObjectURL(previewVideoURL);
      }
    };
  }, [previewVideoURL]);

  return (
    <div className="debug-edit-slot-services">
      <h2>Debug Edit Slot Services</h2>

      {/* Eingabefelder */}
      <div>
        <label>Edit ID:</label>
        <input
          type="number"
          value={editId}
          onChange={(e) => setEditId(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Slot ID:</label>
        <input
          type="number"
          value={slotId}
          onChange={(e) => setSlotId(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Occupied Slot ID:</label>
        <input
          type="number"
          value={occupiedSlotId}
          onChange={(e) => setOccupiedSlotId(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Start Time:</label>
        <input
          type="number"
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
        />
      </div>

      <div>
        <label>End Time:</label>
        <input
          type="number"
          value={endTime}
          onChange={(e) => setEndTime(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Videodatei:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setVideoFile(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* Buttons */}
      <div>
        <Button
          text="Slot hinzufügen"
          onClick={handleAddSlot}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Slot löschen"
          onClick={handleDeleteSlot}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Slot ändern"
          onClick={handleChangeSlot}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Slot Vorschau"
          onClick={handlePreviewSlot}
          theme="light"
          iconPosition="left"
        />
      </div>

      {/* Anzeige der Antworten */}
      <div>
        {addSlotResponse && (
          <div>
            <h3>Slot hinzugefügt:</h3>
            <p>{addSlotResponse.message}</p>
          </div>
        )}

        {changeSlotResponse && (
          <div>
            <h3>Slot geändert:</h3>
            <p>{changeSlotResponse.message}</p>
          </div>
        )}

        {deleteSlotResponse && (
          <div>
            <h3>Slot gelöscht:</h3>
            <p>{deleteSlotResponse.message}</p>
          </div>
        )}

        {previewVideoURL && (
          <div>
            <h3>Slot Vorschau:</h3>
            <video controls src={previewVideoURL} />
          </div>
        )}
      </div>
    </div>
  );
}
