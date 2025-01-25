import { colors } from "../../../style/colors";
import PieChart from "../../ui/PieChart";

const data = [
  {
    id: "Completed",
    label: "Completed",
    value: 0.5,
  },
  {
    id: "To do",
    label: "To do",
    value: 0.3,
  },
  {
    id: "In progress",
    label: "In progress",
    value: 0.2,
  },
];

export default function TaskPieChart() {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-2 p-5 w-1/2">
      <h1 className="text-lg font-semibold text-neutral-700">Tasks</h1>
      <div className="h-72 p-7">
        <PieChart
          data={data}
          padColors={[
            colors.primary[400],
            colors.primary[600],
            colors.primary[800],
          ]}
          customProperties={{
            margin: { bottom: 50, },
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
                itemDirection: "left-to-right"
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
