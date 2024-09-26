import UserTag from "@/components/shared/UserTag";
import UserTags from "@/components/shared/UserTags";
import PanelButton from "../shared/PanelButton";

export default function DebugComponentSetOne() {
  const users = [
    { name: "Alice", id: 0 },
    { name: "Alice", id: 1 },
    { name: "Bob", id: 2 },
    { name: "Charlie", id: 3 },
    { name: "David", id: 4 },
    { name: "Eve", id: 5 },
    { name: "Frank", id: 6 },
    { name: "Grace", id: 7 },
    { name: "Heidi", id: 8 },
    { name: "Ivan", id: 9 },
    { name: "Judy", id: 10 },
  ];

  return (
    <div className="w-1/2 m-auto flex flex-col gap-10 bg-purple-very-dark p-10">
      <div className="flex gap-3 flex-col">
        {users.map(({ name, id }) => (
          <UserTag name={name} id={id} />
        ))}

        <UserTags users={users} />

        <div className="w-[200px] gap-4 flex flex-col">
          <PanelButton text="Hallo" onClick={() => {}} />
          <PanelButton text="Hallo" onClick={() => {}} active />

          <PanelButton user={users[1]} text="Hallo" onClick={() => {}} />
          <PanelButton user={users[0]} text="Hallo" onClick={() => {}} active />
        </div>
      </div>
    </div>
  );
}
