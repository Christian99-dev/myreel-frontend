import React, { useState, useRef, useEffect } from "react";
import Timeline from "@/components/adminpanel/Timeline";
import FileUploadBox from "@/components/shared/FileUpload";
import Input from "@/components/shared/Input";
import Icon from "../shared/Icon";
import Button from "../shared/Button";
import { SongService } from "@/services/backend/SongService";

export default function AddSong({onSuccessfullAdd} : {onSuccessfullAdd: () => void}) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [breakpoints, setBreakpoints] = useState<number[]>([]);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null); // Mutable Ref

  const songServices = new SongService()

  // Handle song file upload and calculate duration
  useEffect(() => {
    if (songFile) {
      const objectUrl = URL.createObjectURL(songFile);
      const audio = new Audio(objectUrl);
      audioRef.current = audio;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [songFile]);

  const clearAll = () => {
    setName("");
    setAuthor("");
    setBreakpoints([]);
    setSongFile(null);
    setCoverFile(null);
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSongFileSelected = (file: File) => {
    setSongFile(file);
  };

  const handleCoverFileSelected = (file: File) => {
    setCoverFile(file);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeSeek = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleClearTimeline = () => {
    setBreakpoints([]);
  };

  // Submit the new song
  const handleSubmit = () => {
    if (!name || !author || !songFile || !coverFile) {
      alert(
        "Bitte fülle alle Felder aus und lade sowohl ein Lied als auch ein Cover hoch."
      );
      return;
    }

    setButtonIsLoading(true)

    songServices.createSong({
      song_file: songFile,
      cover_file: coverFile,
      name: name,
      author: author,
      breakpoints: breakpoints
    }).onError((_, statuscode) => {
      alert(statuscode)
      setButtonIsLoading(false)
    }).onSuccess(() => {
      alert(name + " erfolgreich hochgeladen!")
      clearAll()
      onSuccessfullAdd()
      setButtonIsLoading(false)
    })
  };

  return (
    <>
      <h2 className="fs-7 font-medium text-purple-very-light mb-[--spacing-7]">
        Neuen Song hinzufügen
      </h2>

      <div className="flex gap-[--spacing-5] flex-col">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Gib den Songnamen ein"
          label="Songname"
        />

        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Gib den Autorennamen ein"
          label="Autorennamen"
        />

        <div className="flex gap-[--spacing-5]">
          <div className="size-48 aspect-square">
            <FileUploadBox
              fileName={songFile?.name}
              label="Song Datei"
              accept="audio/*"
              onFileSelected={handleSongFileSelected}
            />
          </div>

          <div className="size-48 aspect-square">
            <FileUploadBox
              fileName={coverFile?.name}
              label="Cover Bild"
              accept="image/*"
              onFileSelected={handleCoverFileSelected}
            />
          </div>
        </div>
      </div>

      {duration > 0 && (
        <div className="items-center flex mb-[--spacing-4]">
          {/* Play/Pause Button */}

          <Icon
            color="pink-very-light"
            onClick={handlePlayPause}
            name={isPlaying ? "pause" : "play"}
          />

          {/* Timeline Component */}
          <Timeline
            duration={duration}
            breakpoints={breakpoints}
            setBreakpoints={setBreakpoints}
            currentTime={currentTime}
            onSeek={handleTimeSeek}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />

          {/* Clear Timeline Button */}
          <Button onClick={handleClearTimeline} text="Clear" iconName="close" />
        </div>
      )}
      <div className="flex gap-[--spacing-4]">
        <Button
          onClick={handleSubmit}
          theme="dark"
          text="Song Hochladen"
          iconName="bigHero"
          disabled={buttonIsLoading}
        />

        <Button
          onClick={clearAll}
          text="Löschen"
          iconName="close"
        />
      </div>
    </>
  );
}
