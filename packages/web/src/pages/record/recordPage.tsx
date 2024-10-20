import { FC, useState } from "react";
import "./recordPage.css";
import { Button, Input, Table, TableColumnsType } from "antd";
import { PromotTypes, RecordTableColumnTypes } from "@/type";
import { ChartCard, DataCard } from "@/components";
import { RecordTableData } from "./recordPage.data";

interface RecordPageProps {}

export const RecordPage: FC<RecordPageProps> = ({}) => {
  const columns: TableColumnsType<RecordTableColumnTypes> = [
    { title: "时间", dataIndex: "time", key: "time", fixed: "left" },
    { title: "类型", dataIndex: "type", key: "type" },
    { title: "状态", dataIndex: "state", key: "state" },
    { title: "支付时间", dataIndex: "payTime", key: "payTime" },
    { title: "会员", dataIndex: "vip", key: "vip" },
    {
      title: "内容",
      dataIndex: "item",
      key: "item",
      render: (text, record, index) => (
        <div>{record.items.map((item) => item.name).join(",")}</div>
      ),
    },
    { title: "收款方式", dataIndex: "payMethod", key: "payMethod" },
    { title: "收款状态", dataIndex: "payState", key: "payState" },
    { title: "收款时间", dataIndex: "payTime", key: "payTime" },
    { title: "收款金额", dataIndex: "payMoney", key: "payMoney" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      fixed: "right",
      render: (text, record, index) => (
        <div className="action-group">
          <a onClick={() => openDeatil(record)}>详情</a>
          <a onClick={() => openDeatil(record)}>打印发票</a>
          <a onClick={() => openDeatil(record)}>打印小票</a>
          <a onClick={() => openDeatil(record)}>退款</a>
        </div>
      ),
    },
  ];
  const openDeatil = (record: RecordTableColumnTypes) => {};
  return (
    <div className="record-page-container page-container">
      <div className="chart">
        <DataCard title="当天营业额" data={1000} />
        <DataCard title="当天订单数" data={1000} />
        <DataCard title="当天营业额" data={1000} />
        <ChartCard title={"订单数"} data={[]} />
        <ChartCard title={"销售额（外卖、堂食）"} data={[]} />
        <ChartCard title={"时间段频次"} data={[]} />
      </div>
      <div className="content">
        <Table<RecordTableColumnTypes>
          columns={columns}
          dataSource={RecordTableData}
        ></Table>
      </div>
    </div>
  );
};

export default RecordPage;
