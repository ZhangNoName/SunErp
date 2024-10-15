import { FC, useState } from "react";
import "./promotPage.css";
import {
  Input,
  Button,
  Table,
  notification,
  Form,
  TableColumnsType,
} from "antd";
import { PriceTableDataType } from "../pirce/pricePageData";
import { PromotTypes } from "@/type";

interface PromotPageProps {}

export const PromotPage: FC<PromotPageProps> = ({}) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const columns: TableColumnsType<PromotTypes> = [
    { title: "名称", dataIndex: "name", key: "name", fixed: "left" },
    { title: "频率", dataIndex: "type", key: "type" },
    { title: "状态", dataIndex: "state", key: "state" },
    { title: "开始时间", dataIndex: "price", key: "price" },
    { title: "结束时间", dataIndex: "price", key: "price" },
    { title: "描述", dataIndex: "des", key: "des" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      fixed: "right",
      render: (text, record, index) => (
        <div className="action-group">
          <a onClick={() => deleteItem(record)}>终止</a>
          <a onClick={() => editItem(record)}>修改</a>
        </div>
      ),
    },
  ];
  const addPromot = () => {};
  const deleteItem = (row: PromotTypes) => {};
  const editItem = (row: PromotTypes) => {};
  return (
    <>
      {contextHolder}
      <div className="promot-page-container">
        <div className="header">
          <Input></Input>
          <Button type="primary" onClick={addPromot}>
            新建活动
          </Button>
        </div>
        <div className="content">
          <Table<PromotTypes>
            pagination={false}
            columns={columns}
            dataSource={[]}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default PromotPage;
