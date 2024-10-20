import { FC, useState } from "react";
import "./vipManagePage.css";
import { Button, Input, Table, TableColumnsType } from "antd";
import { RecordTableData } from "@/pages/record/recordPage.data";
import { RecordTableColumnTypes, VipTableColumnTypes } from "@/type";
import { VipTableData } from "./vipManagePage.data";
import { SearchOutlined } from "@ant-design/icons";

interface VipManagePageProps {}

export const VipManagePage: FC<VipManagePageProps> = ({}) => {
  const columns: TableColumnsType<VipTableColumnTypes> = [
    { title: "昵称", dataIndex: "name", fixed: "left" },
    // { title: "id", dataIndex: "id" },
    { title: "联系方式", dataIndex: "phone" },
    { title: "状态", dataIndex: "state" },
    { title: "等级", dataIndex: "level" },
    { title: "创建时间", dataIndex: "createTime" },
    {
      title: "积分",
      dataIndex: "points",
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: "余额",
      dataIndex: "balance",
      sorter: (a, b) => a.balance - b.balance,
    },
    { title: "上次使用", dataIndex: "lastTime" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      fixed: "right",
      render: (text, record, index) => (
        <div className="action-group">
          <a onClick={() => openDeatil(record)}>详情</a>
          <a onClick={() => openDeatil(record)}>停用</a>
          <a onClick={() => openDeatil(record)}>重置</a>
        </div>
      ),
    },
  ];
  const openDeatil = (record: VipTableColumnTypes) => {};
  return (
    <div className="vip-manage-page-container page-container">
      <div className="header">
        <Input suffix={<SearchOutlined />} />
        <Button>创建</Button>
        <Button type="primary">创建</Button>
      </div>
      <div className="content">
        <Table<VipTableColumnTypes>
          rowKey="id"
          columns={columns}
          dataSource={VipTableData}
        ></Table>
      </div>
    </div>
  );
};

export default VipManagePage;
