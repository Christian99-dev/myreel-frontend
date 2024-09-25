"use client";
import { useState } from "react";
import { SongService } from "@/services/backend/SongService";
import Button from "@/components/shared/Button";
import { PostRequest } from "@/types/SongService";

export default function DebugSongServices() {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [breakpoints, setBreakpoints] = useState<string>("");
  const [songId, setSongId] = useState<number>(1);
  const [fetchedSong, setFetchedSong] = useState<any>(null);

  const songService = new SongService();

  return (
    <div className="debug-routes">
      <h2>Debug Routes for Songs</h2>

      {/* Eingabefelder für Song-Attribute */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Autor:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Breakpoints (kommagetrennt):</label>
        <input
          type="text"
          value={breakpoints}
          onChange={(e) => setBreakpoints(e.target.value)}
        />
      </div>

      {/* Dateiupload für song_file */}
      <div>
        <label>Song-Datei hochladen:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const uploadedFile = e.target.files ? e.target.files[0] : null;
            setSongFile(uploadedFile);
          }}
        />
      </div>

      {/* Dateiupload für cover_file */}
      <div>
        <label>Cover-Datei hochladen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const uploadedFile = e.target.files ? e.target.files[0] : null;
            setCoverFile(uploadedFile);
          }}
        />
      </div>

      {/* Eingabe für Song-ID */}
      <div>
        <label>Song-ID:</label>
        <input
          type="number"
          value={songId}
          onChange={(e) => setSongId(Number(e.target.value))}
        />
      </div>

      {/* Buttons zum Testen der Routen */}
      <div>
        {/* Button zum Auflisten der Songs */}
        <Button
          text="List Songs"
          onClick={() => {
            songService
              .listSongs()
              .onSuccess((data) => console.log("Songs list:", data))
              .onError((error, statuscode) =>
                console.error("Error listing songs:", error, statuscode)
              );
          }}
          theme="light"
          iconPosition="left"
        />

        {/* Button zum Erstellen eines Songs */}
        <Button
          text="Create Song"
          onClick={() => {
            if (!songFile) {
              alert("Bitte zuerst eine Song-Datei hochladen.");
              return;
            }
            if (!coverFile) {
              alert("Bitte zuerst eine Cover-Datei hochladen.");
              return;
            }
            const parsedBreakpoints = breakpoints
              .split(",")
              .map((bp) => Number(bp.trim()))
              .filter((bp) => !isNaN(bp));

            const postData: PostRequest = {
              name: name || "Test Song",
              author: author || "Test Author",
              breakpoints: parsedBreakpoints,
              song_file: songFile,
              cover_file: coverFile,
            };

            songService
              .createSong(postData)
              .onSuccess((data) => console.log("Song created:", data))
              .onError((error, statuscode) =>
                console.error("Error creating song:", error, statuscode)
              );
          }}
          theme="light"
          iconPosition="left"
        />

        {/* Button zum Abrufen eines Songs */}
        <Button
          text="Get Song"
          onClick={() => {
            songService
              .getSong(songId)
              .onSuccess((data) => {
                console.log("Song details:", data);
                setFetchedSong(data);
              })
              .onError((error, statuscode) =>
                console.error("Error fetching song:", error, statuscode)
              );
          }}
          theme="light"
          iconPosition="left"
        />

        {/* Button zum Löschen eines Songs */}
        <Button
          text="Delete Song"
          onClick={() => {
            songService
              .deleteSong(songId)
              .onSuccess((data) => console.log("Song deleted:", data))
              .onError((error, statuscode) =>
                console.error("Error deleting song:", error, statuscode)
              );
          }}
          theme="light"
          iconPosition="left"
        />
      </div>

      {/* Anzeige der abgerufenen Song-Details */}
      {fetchedSong && (
        <div>
          <h3>Fetched Song Details:</h3>
          <textarea
            value={JSON.stringify(fetchedSong, null, 2)}
            readOnly
            rows={10}
            cols={50}
          />
        </div>
      )}
    </div>
  );
}
