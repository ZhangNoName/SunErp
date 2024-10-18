import { FC, useState } from "react";
import "./devicePage.css";
import { DeviceCard } from "@/components";

interface DevicePageProps {}

export const DevicePage: FC<DevicePageProps> = ({}) => {
  return (
    <div className="device-page-container">
      <DeviceCard name="小票机" state="启用"></DeviceCard>
      <DeviceCard name="打印机" state="启用"></DeviceCard>
      <DeviceCard name="钱箱" state="启用"></DeviceCard>
      <DeviceCard name="音响" state="启用"></DeviceCard>
      <DeviceCard name="扫码枪" state="启用"></DeviceCard>
      <DeviceCard name="外接屏幕" state="启用"></DeviceCard>
    </div>
  );
};

export default DevicePage;
