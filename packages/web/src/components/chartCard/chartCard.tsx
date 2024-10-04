import { FC, useState } from "react";
import "./chartCard.css";

interface ChartCardProps {
  title: string;
}

export const ChartCard: FC<ChartCardProps> = ({ title }) => {
  return (
    <div className="chart-card-container">
      <div className="title">{title}</div>
      <div className="chart"></div>
    </div>
  );
};

export default ChartCard;
