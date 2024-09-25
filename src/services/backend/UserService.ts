
import { BaseService, ResponseHandler } from "@/services/backend/Base";
import {
  InviteRequest,
  InviteResponse,
  AcceptInviteRequest,
  AcceptInviteResponse,
  LoginRequestRequest,
  LoginRequestResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/UserService";

export class UserService extends BaseService {
  constructor() {
    super("/user");
  }

  invite(data: InviteRequest): ResponseHandler<InviteResponse> {
    return this.post<InviteResponse>("/invite", data);
  }

  acceptInvite(data: AcceptInviteRequest): ResponseHandler<AcceptInviteResponse> {
    return this.post<AcceptInviteResponse>("/acceptInvite", data);
  }

  loginRequest(data: LoginRequestRequest): ResponseHandler<LoginRequestResponse> {
    return this.post<LoginRequestResponse>("/loginRequest", data);
  }

  login(data: LoginRequest): ResponseHandler<LoginResponse> {
    return this.post<LoginResponse>("/login", data);
  }
}
