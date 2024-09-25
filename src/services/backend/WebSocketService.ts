// services/backend/WebSocketService.ts

import { EventEmitter } from "events";

type MessageHandler = () => void;
type ErrorHandler = (error: any) => void;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class WebSocketService {
  private socket?: WebSocket;
  private eventEmitter: EventEmitter = new EventEmitter();
  private jwt?: string;
  private groupId: string;

  constructor(groupId: string) {
    this.groupId = groupId;

    // Verzögere die Initialisierung, um Event-Handler zu registrieren
    setTimeout(() => {
      this.initialize();
    }, 0);
  }

  private initialize() {
    // JWT aus localStorage laden
    const token = localStorage.getItem("jwt");
    if (!token) {
      // JWT nicht vorhanden, emitte ein Fehlerereignis
      this.eventEmitter.emit("error", new Error("JWT-Token nicht gefunden. Bitte einloggen."));
      return;
    }
    this.jwt = token;

    this.connect();
  }

  private connect() {
    // Erzwinge das wss-Protokoll für sichere Verbindungen
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    // WebSocket-URL erstellen
    const wsUrl = `${protocol}://${BASE_URL.replace("http://", "")}/ws/updates/${this.groupId}`;

    // JWT als Query-Parameter
    const jwtParam = encodeURIComponent(`Bearer ${this.jwt}`);
    const wsUrlWithToken = `${wsUrl}?token=${jwtParam}`;

    // WebSocket-Verbindung herstellen
    this.socket = new WebSocket(wsUrlWithToken);

    // Ereignishandler registrieren
    this.socket.onopen = () => {
      console.log("WebSocket-Verbindung hergestellt.");
    };

    this.socket.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.socket.onerror = (error) => {
      this.eventEmitter.emit("error", error);
    };

    this.socket.onclose = (event) => {
      console.log("WebSocket-Verbindung geschlossen.", event);
      // Optional: Automatischer Wiederverbindungsversuch
    };
  }

  private handleMessage(message: string) {
    switch (message) {
      case "USER":
        this.eventEmitter.emit("userChange");
        break;
      case "EDIT":
        this.eventEmitter.emit("editChange");
        break;
      case "OCCUPIEDSLOT":
        this.eventEmitter.emit("occupiedSlotChange");
        break;
      default:
        console.warn("Unbekannte Nachricht vom WebSocket:", message);
    }
  }

  public onUserChange(handler: MessageHandler): this {
    this.eventEmitter.on("userChange", handler);
    return this;
  }

  public onEditChange(handler: MessageHandler): this {
    this.eventEmitter.on("editChange", handler);
    return this;
  }

  public onOccupiedSlotChange(handler: MessageHandler): this {
    this.eventEmitter.on("occupiedSlotChange", handler);
    return this;
  }

  public onError(handler: ErrorHandler): this {
    this.eventEmitter.on("error", handler);
    return this;
  }

  public close() {
    if (this.socket) {
      this.socket.close();
    }
    this.eventEmitter.removeAllListeners();
  }
}
