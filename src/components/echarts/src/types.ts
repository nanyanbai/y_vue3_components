import type { EChartsCoreOption } from "echarts";

export interface Props {
  width?: string;
  height?: string;
  options: EChartsCoreOption;
  theme?: string | object;
  loading?: boolean;
  autoResize?: boolean;
}
