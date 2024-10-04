import { FC, useState } from "react";
import "./dataCard.css";

interface DataCardProps {
  title: string;
  data: number | string;
  className?: string;
}

export const DataCard: FC<DataCardProps> = ({ title, data, className }) => {
  return (
    <div className={"data-card-container " + className}>
      <div className="data">{data}</div>
      <div className="title">{title}</div>
    </div>
  );
};

export default DataCard;
