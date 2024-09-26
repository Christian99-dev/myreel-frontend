import UserTag from "@/components/shared/UserTag";
import UserTags from "@/components/shared/UserTags";

export default function DebugComponentSetOne() {
  const users = [
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
    <div className="flex gap-3">
      {users.map(({ name, id }) => (
        <UserTag name={name} id={id} />
      ))}

      <UserTags users={users} />
    </div>
  );
}
