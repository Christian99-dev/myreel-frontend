import { BaseService, ResponseHandler } from "@/services/backend/Base";
import {
  PostRequest,
  PostResponse,
  DeleteResponse,
  GroupNameResponse,
  GetResponse,
  GetMembersResponse,
  GetEditsResponse,
} from "@/types/GroupService";

export class GroupService extends BaseService {
  constructor() {
    super("/group");
  }

  createGroup(data: PostRequest): ResponseHandler<PostResponse> {
    return this.post<PostResponse>("/", data);
  }

  deleteGroup(groupId: string): ResponseHandler<DeleteResponse> {
    return this.delete<DeleteResponse>(`/${groupId}`);
  }

  getGroupName(groupId: string): ResponseHandler<GroupNameResponse> {
    return this.get<GroupNameResponse>(`/${groupId}/name`);
  }

  getGroup(groupId: string): ResponseHandler<GetResponse> {
    return this.get<GetResponse>(`/${groupId}`);
  }

  getGroupMembers(groupId: string): ResponseHandler<GetMembersResponse> {
    return this.get<GetMembersResponse>(`/${groupId}/members`);
  }

  getGroupEdits(groupId: string): ResponseHandler<GetEditsResponse> {
    return this.get<GetEditsResponse>(`/${groupId}/edits`);
  }
}
