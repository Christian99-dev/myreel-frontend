// components/debug/DebugEditServices.tsx

"use client";
import { useState, useEffect } from "react";
import { EditService } from "@/services/backend/EditService";
import {
  PostRequest,
  PostResponse,
  GetEditResponse,
  GoLiveResponse,
  DeleteEditResponse,
} from "@/types/EditService";
import Button from "@/components/shared/Button";

export default function DebugEditServices() {
  const editService = new EditService();

  // State-Variablen für Eingaben
  const [groupid, setGroupId] = useState<string>("");
  const [songId, setSongId] = useState<number>(0);
  const [editName, setEditName] = useState<string>("");
  const [editId, setEditId] = useState<number>(0);

  // State-Variablen für Antworten
  const [postResponse, setPostResponse] = useState<PostResponse | null>(null);
  const [getEditResponse, setGetEditResponse] = useState<GetEditResponse | null>(null);
  const [goLiveResponse, setGoLiveResponse] = useState<GoLiveResponse | null>(null);
  const [deleteEditResponse, setDeleteEditResponse] = useState<DeleteEditResponse | null>(
    null
  );

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

  const handleCreateEdit = () => {
    const data: PostRequest = {
      groupid,
      song_id: songId,
      edit_name: editName,
    };

    editService
      .createEdit(data)
      .onSuccess((response) => {
        console.log("Edit erstellt:", response);
        setPostResponse(response);
        setEditId(response.edit_id);
        alert(`Edit erstellt mit ID: ${response.edit_id}`);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Erstellen des Edits:", error, statusCode);
        alert(`Fehler beim Erstellen des Edits: ${error}`);
      });
  };

  const handleGetEditDetails = () => {
    if (!editId) {
      alert("Bitte geben Sie eine Edit-ID an.");
      return;
    }

    editService
      .getEditDetails(editId)
      .onSuccess((response) => {
        console.log("Edit Details:", response);
        setGetEditResponse(response);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Abrufen der Edit-Details:", error, statusCode);
        alert(`Fehler beim Abrufen der Edit-Details: ${error}`);
      });
  };

  const handleGoLive = () => {
    if (!editId) {
      alert("Bitte geben Sie eine Edit-ID an.");
      return;
    }

    editService
      .goLive(editId)
      .onSuccess((response) => {
        console.log("Go Live erfolgreich:", response);
        setGoLiveResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Setzen auf Live:", error, statusCode);
        alert(`Fehler beim Setzen auf Live: ${error}`);
      });
  };

  const handleDeleteEdit = () => {
    if (!editId) {
      alert("Bitte geben Sie eine Edit-ID an.");
      return;
    }

    editService
      .deleteEdit(editId)
      .onSuccess((response) => {
        console.log("Edit gelöscht:", response);
        setDeleteEditResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Fehler beim Löschen des Edits:", error, statusCode);
        alert(`Fehler beim Löschen des Edits: ${error}`);
      });
  };

  return (
    <div className="debug-edit-services">
      <h2>Debug Edit Services</h2>

      {/* Eingabefelder */}
      <div>
        <label>Group ID:</label>
        <input
          type="text"
          value={groupid}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </div>

      <div>
        <label>Song ID:</label>
        <input
          type="number"
          value={songId}
          onChange={(e) => setSongId(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Edit Name:</label>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </div>

      <div>
        <label>Edit ID:</label>
        <input
          type="number"
          value={editId}
          onChange={(e) => setEditId(Number(e.target.value))}
        />
      </div>

      {/* Buttons */}
      <div>
        <Button
          text="Edit erstellen"
          onClick={handleCreateEdit}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Edit Details abrufen"
          onClick={handleGetEditDetails}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Go Live"
          onClick={handleGoLive}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Edit löschen"
          onClick={handleDeleteEdit}
          theme="light"
          iconPosition="left"
        />
      </div>

      {/* Anzeige der Antworten */}
      <div>
        {postResponse && (
          <div>
            <h3>Erstellter Edit:</h3>
            <pre>{JSON.stringify(postResponse, null, 2)}</pre>
          </div>
        )}

        {getEditResponse && (
          <div>
            <h3>Edit Details:</h3>
            <pre>{JSON.stringify(getEditResponse, null, 2)}</pre>
          </div>
        )}

        {goLiveResponse && (
          <div>
            <h3>Go Live Antwort:</h3>
            <p>{goLiveResponse.message}</p>
          </div>
        )}

        {deleteEditResponse && (
          <div>
            <h3>Edit gelöscht:</h3>
            <p>{deleteEditResponse.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
