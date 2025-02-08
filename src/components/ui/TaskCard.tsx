import { Task } from "../../lib/types/Types";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-neutral-700 shadow-lg border-2 border-neutral-100">
      {task.title}
      <span>{task.priority}</span>
    </div>
  );
}
