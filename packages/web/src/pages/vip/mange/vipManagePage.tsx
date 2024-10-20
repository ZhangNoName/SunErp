import { FC, useState } from "react";
import "./vipManagePage.css";
import { Input, Table } from "antd";

interface VipManagePageProps {}

export const VipManagePage: FC<VipManagePageProps> = ({}) => {
  return (
    <div className="vip-manage-page-container">
      <div className="header">
        <Input />
        123456
      </div>
      <div className="header">
        <Table></Table>
      </div>
    </div>
  );
};

export default VipManagePage;
