import UserTag from "./UserTag";

export default function UserTags({
  users,
}: {
  users: { name: string; id: number }[];
}) {
  return (
    <div className="flex min-h-[--spacing-7]">
      {users.map(({ name, id }, key) => (
        <div className={`${users.length > 1 ? "ml-[-5px]" : ""}`} key={key}>
          <UserTag name={name} id={id} />
        </div>
      ))}
    </div>
  );
}
