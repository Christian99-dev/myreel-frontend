// services/backend/EditService.ts

import { BaseService, ResponseHandler } from "@/services/backend/Base";
import {
  PostRequest,
  PostResponse,
  GetEditResponse,
  GoLiveResponse,
  DeleteEditResponse,
} from "@/types/EditService";

export class EditService extends BaseService {
  constructor() {
    super("/edit");
  }

  createEdit(data: PostRequest): ResponseHandler<PostResponse> {
    return this.post<PostResponse>("/", data);
  }

  getEditDetails(edit_id: number): ResponseHandler<GetEditResponse> {
    return this.get<GetEditResponse>(`/${edit_id}`);
  }

  goLive(edit_id: number): ResponseHandler<GoLiveResponse> {
    return this.post<GoLiveResponse>(`/${edit_id}/goLive`, null);
  }

  deleteEdit(edit_id: number): ResponseHandler<DeleteEditResponse> {
    return this.delete<DeleteEditResponse>(`/${edit_id}`);
  }
}
