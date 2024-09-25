"use client";
import { useState } from "react";
import { GroupService } from "@/services/backend/GroupService";
import {
  PostRequest,
  PostResponse,
  DeleteResponse,
  GroupNameResponse,
  GetResponse,
  GetMembersResponse,
  GetEditsResponse,
  Member,
  Edit,
} from "@/types/GroupService";
import Button from "@/components/shared/Button";

export default function DebugGroupServices() {
  const groupService = new GroupService();

  const [groupId, setGroupId] = useState<string>("");
  const [groupname, setGroupname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [groupNameResponse, setGroupNameResponse] = useState<GroupNameResponse | null>(null);
  const [getGroupResponse, setGetGroupResponse] = useState<GetResponse | null>(null);
  const [getMembersResponse, setGetMembersResponse] = useState<GetMembersResponse | null>(null);
  const [getEditsResponse, setGetEditsResponse] = useState<GetEditsResponse | null>(null);

  const [jwt, setJwt] = useState<string>("");

  // Speichern des JWT im localStorage
  const saveJwt = (token: string) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
  };

  const handleCreateGroup = () => {
    const data: PostRequest = {
      groupname,
      username,
      email,
    };

    groupService
      .createGroup(data)
      .onSuccess((response) => {
        console.log("Group created:", response);
        setGroupId(response.group_id);
        saveJwt(response.jwt); // JWT speichern
        alert(`Group created with ID: ${response.group_id}`);
      })
      .onError((error, statusCode) => {
        console.error("Error creating group:", error, statusCode);
        alert(`Error creating group: ${error}`);
      });
  };

  const handleDeleteGroup = () => {
    if (!groupId) {
      alert("Please provide a group ID.");
      return;
    }

    groupService
      .deleteGroup(groupId)
      .onSuccess((response) => {
        console.log("Group deleted:", response);
        alert("Group successfully deleted");
      })
      .onError((error, statusCode) => {
        console.error("Error deleting group:", error, statusCode);
        alert(`Error deleting group: ${error}`);
      });
  };

  const handleGetGroupName = () => {
    if (!groupId) {
      alert("Please provide a group ID.");
      return;
    }

    groupService
      .getGroupName(groupId)
      .onSuccess((response) => {
        console.log("Group name:", response);
        setGroupNameResponse(response);
      })
      .onError((error, statusCode) => {
        console.error("Error getting group name:", error, statusCode);
        alert(`Error getting group name: ${error}`);
      });
  };

  const handleGetGroup = () => {
    if (!groupId) {
      alert("Please provide a group ID.");
      return;
    }

    groupService
      .getGroup(groupId)
      .onSuccess((response) => {
        console.log("Group details:", response);
        setGetGroupResponse(response);
      })
      .onError((error, statusCode) => {
        console.error("Error getting group:", error, statusCode);
        alert(`Error getting group: ${error}`);
      });
  };

  const handleGetGroupMembers = () => {
    if (!groupId) {
      alert("Please provide a group ID.");
      return;
    }

    groupService
      .getGroupMembers(groupId)
      .onSuccess((response) => {
        console.log("Group members:", response);
        setGetMembersResponse(response);
      })
      .onError((error, statusCode) => {
        console.error("Error getting group members:", error, statusCode);
        alert(`Error getting group members: ${error}`);
      });
  };

  const handleGetGroupEdits = () => {
    if (!groupId) {
      alert("Please provide a group ID.");
      return;
    }

    groupService
      .getGroupEdits(groupId)
      .onSuccess((response) => {
        console.log("Group edits:", response);
        setGetEditsResponse(response);
      })
      .onError((error, statusCode) => {
        console.error("Error getting group edits:", error, statusCode);
        alert(`Error getting group edits: ${error}`);
      });
  };

  return (
    <div className="debug-group-services">
      <h2>Debug Group Services</h2>

      {/* Eingabefelder */}
      <div>
        <label>Group ID:</label>
        <input
          type="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </div>

      <div>
        <label>Group Name:</label>
        <input
          type="text"
          value={groupname}
          onChange={(e) => setGroupname(e.target.value)}
        />
      </div>

      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

      {/* Buttons */}
      <div>
        <Button
          text="Create Group"
          onClick={handleCreateGroup}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Delete Group"
          onClick={handleDeleteGroup}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Get Group Name"
          onClick={handleGetGroupName}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Get Group"
          onClick={handleGetGroup}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Get Group Members"
          onClick={handleGetGroupMembers}
          theme="light"
          iconPosition="left"
        />
        <Button
          text="Get Group Edits"
          onClick={handleGetGroupEdits}
          theme="light"
          iconPosition="left"
        />
      </div>

      {/* Anzeige der Ergebnisse */}
      <div>
        {groupNameResponse && (
          <div>
            <h3>Group Name:</h3>
            <p>{groupNameResponse.name}</p>
          </div>
        )}

        {getGroupResponse && (
          <div>
            <h3>Group Details:</h3>
            <pre>{JSON.stringify(getGroupResponse, null, 2)}</pre>
          </div>
        )}

        {getMembersResponse && (
          <div>
            <h3>Group Members:</h3>
            <ul>
              {getMembersResponse.members.map((member: Member) => (
                <li key={member.user_id}>
                  {member.name} - {member.role}
                </li>
              ))}
            </ul>
          </div>
        )}

        {getEditsResponse && (
          <div>
            <h3>Group Edits:</h3>
            <ul>
              {getEditsResponse.edits.map((edit: Edit) => (
                <li key={edit.edit_id}>
                  {edit.name} (Created by: {edit.created_by}) - Live:{" "}
                  {edit.isLive ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
