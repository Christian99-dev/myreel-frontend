import { ResponseHandler, BaseService } from "@/services/backend/Base";
import {
  PostRequest,
  PostResponse,
  DeleteResponse,
  ListResponse,
  GetResponse,
  UpdateRequest,
  UpdateResponse,
} from "@/types/SongService";

export class SongService extends BaseService {
  constructor() {
    super("/song");
  }

  createSong(data: PostRequest): ResponseHandler<PostResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("author", data.author);

    // Breakpoints anhängen
    data.breakpoints.forEach((bp) => {
      formData.append("breakpoints", bp.toString());
    });

    formData.append("song_file", data.song_file);
    formData.append("cover_file", data.cover_file);

    return this.post<PostResponse>("/", formData);
  }

  deleteSong(songId: number): ResponseHandler<DeleteResponse> {
    return this.delete<DeleteResponse>(`/${songId}`);
  }

  listSongs(): ResponseHandler<ListResponse> {
    return this.get<ListResponse>("/list");
  }

  getSong(songId: number): ResponseHandler<GetResponse> {
    return this.get<GetResponse>(`/${songId}`);
  }

  updateSong(
    songId: number,
    data: UpdateRequest
  ): ResponseHandler<UpdateResponse> {
    return this.put<UpdateResponse>(`/${songId}`, data);
  }

  patchSong(
    songId: number,
    data: Partial<UpdateRequest>
  ): ResponseHandler<UpdateResponse> {
    return this.patch<UpdateResponse>(`/${songId}`, data);
  }
}
