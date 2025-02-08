import { CheckSquareOffset } from "@phosphor-icons/react";
import { Task } from "../../../lib/types/Types";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function TasksToComplete({
  tasks,
}: {
  tasks: Task[] | null | undefined;
}) {
  const uncompletedTasks = tasks?.filter(
    (task) => task.status === "To do" || task.status === "In Progress"
  );

  return (
    <div className="bg-white rounded-xl  p-4 w-full text-neutral-700 flex flex-col gap-12 border-2 border-primary-100/70">
      <div className="flex items-center gap-4">
        <span className="rounded-full p-2 bg-primary-200 text-primary-700">
          <CheckSquareOffset size={20} />
        </span>
        <span className="text-md  font-semibold">Tasks to complete</span>
      </div>
      <div className="flex items-end w-full justify-between px-2">
        {tasks && uncompletedTasks ? (
          <span className="text-5xl font-bold ">
            {uncompletedTasks.length}
            <span className="text-xl font-normal text-neutral-400">{`/${tasks?.length}`}</span>
          </span>
        ) : (
          <span></span>
        )}
        <Link to="/tasks">
          <Button
            variant="link"
            className="underline text-sm py-1 px-2 text-primary-500/70"
          >
            See all
          </Button>
        </Link>
      </div>
    </div>
  );
}
