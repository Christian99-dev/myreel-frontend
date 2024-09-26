"use client";

import AddSong from "@/components/adminpanel/AddSong";
import PanelButton from "@/components/shared/PanelButton";
import PanelLayout from "@/components/shared/PanelLayout";
import SongComponent from "@/components/shared/Song";
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
      <div className="flex flex-col gap-[--spacing-5]">
        {songs
          ? songs.map(({ name, author, cover_src, song_id, audio_src }) => (
              <SongComponent
                audio_src={audio_src}
                key={song_id}
                name={name}
                author={author}
                img={cover_src}
                buttonIcon="close"
                buttonName="Delete"
                buttonOnClick={() => {
                  songService
                    .deleteSong(song_id)
                    .onSuccess((_) => {
                      updateSongs();
                    })
                    .onError((_, statuscode) => {
                      alert(statuscode);
                    });
                }}
              />
            ))
          : "Loading..."}
        <AddSong onSuccessfullAdd={() => updateSongs()} />
      </div>
    </PanelLayout>
  );
}
