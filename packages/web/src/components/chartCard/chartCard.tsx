import { FC, useEffect, useRef, useState } from "react";
import "./chartCard.css";
import * as echarts from "echarts";
import { DefaultChartOptions } from "./chartCard.data";
interface ChartCardProps {
  title: string;
  data: any;
  options?: any;
}

export const ChartCard: FC<ChartCardProps> = ({ title, data, options }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = DefaultChartOptions;

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);
  return (
    <div className="chart-card-container">
      <div className="chart-card-title">{title}</div>
      <div ref={chartRef} className="chart-card-chart"></div>
    </div>
  );
};

export default ChartCard;
