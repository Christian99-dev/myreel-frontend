export interface PostRequest {
    name: string;
    author: string;
    breakpoints: number[];
    song_file: File;
    cover_file: File;
  }
  
  export interface Song {
    name: string;
    author: string;
    times_used: number;
    song_id: number;
    cover_src: string;
    audio_src: string;
  }
  
  export interface PostResponse extends Song {}
  export interface ListResponse {
    songs: Song[];
  }
  export interface DeleteResponse {
    message: string;
  }
  export interface GetResponse extends Song {}
  
  export interface UpdateRequest {
    name: string;
    author: string;
    breakpoints: number[];
  }
  
  export interface UpdateResponse extends Song {}