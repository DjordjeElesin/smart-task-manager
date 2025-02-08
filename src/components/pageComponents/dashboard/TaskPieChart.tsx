import { useMemo } from "react";
import useFirebase from "../../../hooks/useFirebase";
import useTasks from "../../../hooks/useTasks";
import { colors } from "../../../style/colors";
import PieChart from "../../ui/PieChart";
import Spinner from "../../ui/Spinner";
import { Plus } from "@phosphor-icons/react";

export default function TaskPieChart() {
  const { auth } = useFirebase();
  const userId = auth.currentUser?.uid
  const { data: tasksData, isLoading } = useTasks(userId)

  const statusCounts = useMemo(() => {
    const initialStatusCounts = {
      "To do": 0,
      "In Progress": 0,
      Done: 0,
    };
    return (
      tasksData?.reduce((counts, task) => {
        counts[task.status] = (counts[task.status] || 0) + 1;
        return counts;
      }, initialStatusCounts) || {}
    );
  }, [tasksData]);

  const statusData = useMemo(
    () =>
      Object.entries(statusCounts).map(([key, value]) => ({
        id: key,
        label: key,
        value: (value as number) / (tasksData?.length || 1),
      })),
    [statusCounts, tasksData]
  );

  const checkTaskDataLength = () => {
    return !statusData.every((status) => status.value === 0);
  };

  return (
    <div className="bg-white rounded-xl row-span-2 flex flex-col gap-2 p-5 w-full border-2 border-primary-100/70">
      <h1 className="text-lg font-semibold text-neutral-700">Tasks</h1>
      <div className="h-72 w-full flex items-center justify-center p-7">
        {isLoading ? (
          <Spinner size="40px" />
        ) : checkTaskDataLength() ? (
          <PieChart
            data={statusData}
            padColors={[
              colors.primary[400],
              colors.primary[600],
              colors.primary[800],
            ]}
            customProperties={{
              margin: { bottom: 50 },
              legends: [
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 50,
                  itemWidth: 100,
                  itemHeight: 20,
                  symbolSize: 20,
                  symbolShape: "circle",
                  itemTextColor: colors.neutral[600],
                  itemDirection: "left-to-right",
                },
              ],
            }}
          />
        ) : (
          <div className="h-60 flex flex-col items-center justify-center gap-6 p-6 w-full rounded-xl bg-primary-100 text-primary-700/60 text-center">
            <span className=" font-semibold">No tasks found</span>
            <span className="text-sm">It seems there are no tasks created yet</span>
            <span className="border-2 border-primary-700/50 rounded-full p-3">
              <Plus size={30}/>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
