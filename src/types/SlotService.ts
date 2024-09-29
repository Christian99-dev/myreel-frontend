export interface AddSlotRequest {
  start_time: number;
  end_time: number;
  video_file: File; // Repräsentiert die hochgeladene Videodatei
}

export interface AddSlotResponse {
  message: string;
}

export interface DeleteSlotResponse {
  message: string;
}

export interface ChangeSlotRequest {
  start_time: number;
  end_time: number;
  video_file?: File;
}

export interface ChangeSlotResponse {
  message: string;
}

export interface PreviewSlotRequest {
  start_time: number;
  end_time: number;
  video_file: File;
}
