import { format } from "date-fns";
import { Task } from "../../lib/types/Types";
import PriorityBadge from "./PriorityBadge";
import useUsers from "../../hooks/useUsers";

export default function SmallTaskCard({ task }: { task: Task }) {
  const { data: assignedTos } = useUsers(Object.keys(task.assignedTo || {}));

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 text-neutral-700 shadow-lg border-2 border-neutral-100">
      <span
        className="h-12 w-1 rounded-lg"
        style={{ backgroundColor: task.color }}
      ></span>
      <div className="flex flex-col">
        <span className="font-semibold">{task.title}</span>
        <div className="flex gap-2 text-xs">
          <span className="text-neutral-400">Due: </span>
          <span>{format(task.dueDate.toDate(), "MMMM do, yyyy")}</span>
        </div>
      </div>
      <div className="flex-1 pl-4">
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="flex flex-col gap-1 items-end">
        <div className="flex ">
          {assignedTos?.map((user, index) => (
            <span
            key={user.userId}
            className="w-6 h-6 rounded-full -mr-1 overflow-hidden"
              style={{ zIndex: assignedTos.length + index }}
            >

              <img
                src={user.photoURL}
                alt={`profile image of ${user.name}`}
                className="w-full h-full object-cover"
              />
            </span>
          ))}
        </div>
        <span className="text-xs text-neutral-400">{task.projectName}</span>
      </div>
    </div>
  );
}
