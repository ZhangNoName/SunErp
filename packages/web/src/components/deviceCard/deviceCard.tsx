import { FC, useState } from "react";
import "./deviceCard.css";

interface DeviceCardProps {
  name: string;
  state: string;
  type?: string;
}

export const DeviceCard: FC<DeviceCardProps> = ({ name, state }) => {
  return (
    <div className="device-card-container">
      <div className="device-title">{name}</div>
      <div className="device-info">{state}</div>
    </div>
  );
};

export default DeviceCard;
