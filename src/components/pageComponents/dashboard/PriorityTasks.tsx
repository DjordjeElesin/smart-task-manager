import useFirebase from "../../../hooks/useFirebase";
import useTasks from "../../../hooks/useTasks";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import SmallTaskCard from "../../ui/SmallTaskCard";
import { SortAscending } from "@phosphor-icons/react";

export default function PriorityTasks() {
  const { auth } = useFirebase();
  const userId = auth.currentUser?.uid;
  const { data: taskData } = useTasks(userId, "high");

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border-2 border-primary-100/70">
      <div className="flex items-center w-full justify-between ">
        <div className="text-neutral-700 font-semibold flex gap-2 items-center">
          <SortAscending size={25} weight="bold" />
          <h1 className="text-xl ">Priority Tasks</h1>
        </div>
        <Link to="/tasks">
          <Button
            variant="link"
            className="underline text-primary-500/70"
            size="sm"
          >
            See all
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full px-4 py-6 pb-14 rounded-xl">
        {taskData &&
          taskData
            .slice(0, 4)
            .map((task) => <SmallTaskCard task={task} key={task.id} />)}
      </div>
    </div>
  );
}
