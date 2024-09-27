"use client";

import AddSong from "@/components/adminpanel/AddSong";
import SongList from "@/components/adminpanel/SongList";
import PanelButton from "@/components/shared/PanelButton";
import PanelLayout from "@/components/shared/PanelLayout";
import { SongService } from "@/services/backend/SongService";
import { Song } from "@/types/SongService";
import { useEffect, useState } from "react";

export default function Page() {
  const [songs, setSongs] = useState<Song[]>();
  const songService = new SongService();

  const updateSongs = () =>
    songService
      .listSongs()
      .onSuccess((res) => {
        setSongs(res.songs);
      })
      .onError((_, statuscode) => {
        alert(statuscode);
      });

  useEffect(() => {
    updateSongs();
  }, []);

  return (
    <PanelLayout title="Admin Panel">
      <>
        <PanelButton text="Songs" active />
      </>

      <>
        <div className="flex flex-col gap-[--spacing-5]">
          {songs ? <SongList songs={songs} onSuccessfullDelete={() => updateSongs()} /> : "Loading..."}
          <AddSong onSuccessfullAdd={() => updateSongs()} />
        </div>
      </>
    </PanelLayout>
  );
}
