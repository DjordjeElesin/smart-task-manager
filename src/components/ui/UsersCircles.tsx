import { User } from "../../lib/types/Types";

export default function UsersCircles({
  users,
  sizePx = 24,
  isLoading,
}: {
  users: User[] | undefined;
  sizePx?: number;
  isLoading?: boolean;
}) {
  return (
    <div className="flex ">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className="bg-neutral-200 border border-neutral-400 rounded-full -mr-1 overflow-hidden"
              style={{
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                zIndex: 3 + index,
              }}
            ></span>
          ))
        : users?.map((user, index) => (
            <span
              key={user.userId}
              className="rounded-full -mr-1 overflow-hidden"
              style={{
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                zIndex: users.length + index,
              }}
            >
              <img
                src={user.photoURL}
                alt={`profile image of ${user.name}`}
                className="w-full h-full object-cover"
              />
            </span>
          ))}
    </div>
  );
}
