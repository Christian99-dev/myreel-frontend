export interface InviteRequest {
  groupid: string;
  email: string;
}

export interface InviteResponse {
  message: string;
}

export interface AcceptInviteRequest {
  groupid: string;
  invitationid: string;
  token: string;
  name: string;
}

export interface AcceptInviteResponse {
  jwt: string;
}

export interface LoginRequestRequest {
  email: string;
  groupid: string;
}

export interface LoginRequestResponse {
  message: string;
}

export interface LoginRequest {
  groupid: string;
  email: string;
  pin: string;
}

export interface LoginResponse {
  jwt: string;
  user_id: number;
  name: string;
}
