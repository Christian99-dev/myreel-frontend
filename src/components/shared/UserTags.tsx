import UserTag from "./UserTag";

export default function UserTags({
  users,
}: {
  users: { name: string; id: number }[];
}) {
  return (
    <div className="flex">
      {users.map(({ name, id }, key) => (
        <div className="ml-[-5px]" key={key}>
          <UserTag name={name} id={id} />
        </div>
      ))}
    </div>
  );
}
