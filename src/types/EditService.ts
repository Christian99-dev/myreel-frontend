export interface User {
  user_id: number;
  name: string;
}

export interface Slot {
  slot_id: number;
  song_id: number;
  start_time: number;
  end_time: number;
  occupied_by?: User; // Optional
  occupied_id?: number; // Optional
  video_src?: string; // Optional
  occupied_start_time?: number; // Optional
  occupied_endtime?: number; // Optional
}

export interface Edit {
  edit_id: number;
  song_id: number;
  group_id: string;
  created_by: number;
  name: string;
  isLive: boolean;
  video_src: string;
}

// POST /{edit_id}/goLive/
export interface GoLiveResponse {
  message: string;
}

// DELETE /{edit_id}
export interface DeleteEditResponse {
  message: string;
}

// POST /
export interface PostRequest {
  groupid: string;
  song_id: number;
  edit_name: string;
}

// POST / response
export interface PostResponse extends Edit {}

// GET /{edit_id}
export interface GetEditResponse {
  created_by: User;
  edit: Edit;
  slots: Slot[];
}
