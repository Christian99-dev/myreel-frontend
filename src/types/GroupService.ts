export interface User {
    id: number;
    name: string;
    role: string;
    email: string;
  }
  
  export interface Member {
    user_id: number;
    role: string;
    name: string;
  }
  
  export interface Edit {
    edit_id: number;
    created_by: number;
    name: string;
    isLive: boolean;
  }
  
  // POST /
  export interface PostRequest {
    groupname: string;
    username: string;
    email: string;
  }
  
  export interface PostResponse {
    jwt: string;
    group_id: string;
  }
  
  // DELETE /{group_id}
  export interface DeleteResponse {
    message: string;
  }
  
  // GET /{group_id}/name
  export interface GroupNameResponse {
    name: string;
  }
  
  // GET /{group_id}
  export interface GetResponse {
    user: User;
    group_name: string;
    group_id: string;
    created_by: string;
  }
  
  // GET /{group_id}/members
  export interface GetMembersResponse {
    members: Member[];
  }
  
  // GET /{group_id}/edits
  export interface GetEditsResponse {
    edits: Edit[];
  }
  