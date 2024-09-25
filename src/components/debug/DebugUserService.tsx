"use client";
import { useState } from "react";
import { UserService } from "@/services/backend/UserService";
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
import Button from "@/components/shared/Button";

export default function DebugUserServices() {
  const userService = new UserService();

  // State-Variablen für Eingaben
  const [groupid, setGroupId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [invitationid, setInvitationId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  // State-Variablen für Antworten
  const [inviteResponse, setInviteResponse] = useState<InviteResponse | null>(null);
  const [acceptInviteResponse, setAcceptInviteResponse] = useState<AcceptInviteResponse | null>(null);
  const [loginRequestResponse, setLoginRequestResponse] = useState<LoginRequestResponse | null>(null);
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);

  // JWT-Token
  const [jwt, setJwt] = useState<string>("");

  // Speichern des JWT im localStorage
  const saveJwt = (token: string) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
  };

  const handleInvite = () => {
    const data: InviteRequest = {
      groupid,
      email,
    };

    userService
      .invite(data)
      .onSuccess((response) => {
        console.log("Invite success:", response);
        setInviteResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Error inviting user:", error, statusCode);
        alert(`Fehler beim Einladen des Benutzers: ${error}`);
      });
  };

  const handleAcceptInvite = () => {
    const data: AcceptInviteRequest = {
      groupid,
      invitationid,
      token,
      name,
    };

    userService
      .acceptInvite(data)
      .onSuccess((response) => {
        console.log("Accept invite success:", response);
        setAcceptInviteResponse(response);
        saveJwt(response.jwt);
        alert("Einladung akzeptiert. JWT-Token gespeichert.");
      })
      .onError((error, statusCode) => {
        console.error("Error accepting invite:", error, statusCode);
        alert(`Fehler beim Akzeptieren der Einladung: ${error}`);
      });
  };

  const handleLoginRequest = () => {
    const data: LoginRequestRequest = {
      email,
      groupid,
    };

    userService
      .loginRequest(data)
      .onSuccess((response) => {
        console.log("Login request success:", response);
        setLoginRequestResponse(response);
        alert(response.message);
      })
      .onError((error, statusCode) => {
        console.error("Error requesting login:", error, statusCode);
        alert(`Fehler beim Anfordern des Logins: ${error}`);
      });
  };

  const handleLogin = () => {
    const data: LoginRequest = {
      groupid,
      email,
      pin,
    };

    userService
      .login(data)
      .onSuccess((response) => {
        console.log("Login success:", response);
        setLoginResponse(response);
        saveJwt(response.jwt);
        alert("Login erfolgreich. JWT-Token gespeichert.");
      })
      .onError((error, statusCode) => {
        console.error("Error logging in:", error, statusCode);
        alert(`Fehler beim Login: ${error}`);
      });
  };

  return (
    <div className="debug-user-services">
      <h2>Debug User Services</h2>

      {/* Eingabefelder */}
      <div>
        <label>Group ID:</label>
        <input
          type="text"
          value={groupid}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Invitation ID:</label>
        <input
          type="text"
          value={invitationid}
          onChange={(e) => setInvitationId(e.target.value)}
        />
      </div>

      <div>
        <label>Token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>PIN:</label>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div>
        <Button
          text="Benutzer einladen"
          onClick={handleInvite}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Einladung akzeptieren"
          onClick={handleAcceptInvite}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Login anfordern"
          onClick={handleLoginRequest}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Login"
          onClick={handleLogin}
          theme="light"
          iconPosition="left"
        />
      </div>

      {/* Anzeige der Antworten */}
      <div>
        {inviteResponse && (
          <div>
            <h3>Invite Response:</h3>
            <p>{inviteResponse.message}</p>
          </div>
        )}

        {acceptInviteResponse && (
          <div>
            <h3>Accept Invite Response:</h3>
            <p>JWT: {acceptInviteResponse.jwt}</p>
          </div>
        )}

        {loginRequestResponse && (
          <div>
            <h3>Login Request Response:</h3>
            <p>{loginRequestResponse.message}</p>
          </div>
        )}

        {loginResponse && (
          <div>
            <h3>Login Response:</h3>
            <p>JWT: {loginResponse.jwt}</p>
            <p>User ID: {loginResponse.user_id}</p>
            <p>Name: {loginResponse.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
