import { X } from "@phosphor-icons/react";
import { User } from "../../lib/types/Types";

export default function SmallUserCard({
  user,
  handleClick,
  handleRemoveMember,
  isMember,
}: {
  user: User;
  handleClick: (user: User) => void;
  handleRemoveMember: (user: User) => void;
  isMember: boolean;
}) {
  return (
    <div
      className="w-full flex items-center justify-between rounded-xl border-2 border-neutral-200/40 p-2 transition-all duration-300  hover:bg-neutral-100 hover:cursor-pointer"
      onClick={() => handleClick(user)}
    >
      <div className="flex gap-3 items-center">
        <img
          src={user.photoURL}
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="text-neutral-500">{user.name}</span>
      </div>
      {isMember && (
        <div
          className="rounded-full transition-all duration-300 p-1 hover:bg-neutral-200 hover:cursor-pointer"
          onClick={() => handleRemoveMember(user)}
        >
          <X size={20} />
        </div>
      )}
    </div>
  );
}
