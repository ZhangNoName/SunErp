import {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  EChartsOption,
} from "echarts";
export const DefaultBarOption: BarSeriesOption = {};
export const DefaultTileOption: EChartsOption["title"] = {
  show: false,
};
export const DefaultChartOptions: EChartsOption = {
  title: DefaultTileOption,
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
export const chartData = {
  // 折线图数据
  line: {
    xAxis: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
    series: [
      {
        name: "订单数",
        data: [12, 34, 56, 78, 90, 34, 12],
      },
    ],
  },
  // 柱状图数据
  bar: {
    xAxis: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
    series: [
      {
        name: "订单数",
        data: [12, 34, 56, 78],
      },
    ],
  },
};
