"use client";
import React, { useEffect, useState } from "react";
import { WebSocketService } from "@/services/backend/WebSocketService";

export default function DebugWebSocket() {
  const [groupId, setGroupId] = useState<string>(""); // Hier kannst du eine Standard-Gruppen-ID setzen
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) {
      setError("Bitte geben Sie eine Gruppen-ID ein.");
      return;
    }

    const ws = new WebSocketService(groupId)
      .onUserChange(() => {
        console.log("Benutzeränderung erkannt.");
        setMessages((prev) => [...prev, "USER"]);
      })
      .onEditChange(() => {
        console.log("Editänderung erkannt.");
        setMessages((prev) => [...prev, "EDIT"]);
      })
      .onOccupiedSlotChange(() => {
        console.log("Änderung bei belegten Slots erkannt.");
        setMessages((prev) => [...prev, "OCCUPIEDSLOT"]);
      })
      .onError((err) => {
        console.error("WebSocket-Fehler:", err);
        setError("WebSocket-Fehler: " + (err.message || JSON.stringify(err)));
      });

    return () => {
      ws.close();
    };
  }, [groupId]);

  return (
    <div className="debug-websocket">
      <h2>Debug WebSocket</h2>

      {/* Eingabefeld für die Gruppen-ID */}
      <div>
        <label>Group ID:</label>
        <input
          type="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </div>

      {/* Anzeige der empfangenen Nachrichten */}
      <div>
        <h3>Empfangene Nachrichten:</h3>
        {messages.length > 0 ? (
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          <p>Keine Nachrichten empfangen.</p>
        )}
      </div>

      {/* Anzeige von Fehlern */}
      {error && (
        <div>
          <h3>Fehler:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
