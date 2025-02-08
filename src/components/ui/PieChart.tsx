import { ResponsivePie } from "@nivo/pie";
import { PieDataType } from "../../lib/types/Types";
import { colors } from "../../style/colors";

type PieChartProps = {
  data: PieDataType[];
  padColors: string[];
  customProperties?: Omit<React.ComponentProps<typeof ResponsivePie>, "data">;
};

const PieChart = ({ data, padColors, customProperties }: PieChartProps) => (
  <ResponsivePie
    {...customProperties}
    data={data}
    colors={padColors}
    innerRadius={0.5}
    padAngle={1}
    valueFormat=" >-.0%"
    cornerRadius={3}
    activeOuterRadiusOffset={10}
    arcLinkLabelsOffset={-8}
    arcLinkLabelsTextColor={colors.neutral[600]}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={colors.neutral[100]}
    theme={{
      labels: {
        text: {
          fontSize: 15,
          fontWeight: 500,
        },
      },
      legends: {
        text: {
          fontWeight: 600,
          color: colors.neutral[700],
        },
      },
    }}
  />
);

export default PieChart;
