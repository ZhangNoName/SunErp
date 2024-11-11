import { FC, useState } from "react";
import "./vipManagePage.css";
import { Button, Input, Modal, Table, TableColumnsType } from "antd";
import { RecordTableData } from "@/pages/record/recordPage.data";
import { RecordTableColumnTypes, VipTableColumnTypes } from "@/type";
import { VipTableData } from "./vipManagePage.data";
import { SearchOutlined } from "@ant-design/icons";
import VipInfoModal from "./infoModal/vipInfoModal";
import VipRechargeModal from "./rechargeModal/vipRechargeModal";

interface VipManagePageProps {}

export const VipManagePage: FC<VipManagePageProps> = ({}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("add");
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
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
          <a onClick={() => openRechargeModal(record)}>充值</a>
        </div>
      ),
    },
  ];
  const createVip = () => {
    setModalOpen(true);
    setModalMode("add");
  };
  const openDeatil = (record: VipTableColumnTypes) => {
    setModalOpen(true);
    setModalMode("edit");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const saveModal = () => {};
  const rechargeModalClose = () => {
    setRechargeModalOpen(false);
  };
  const rechargeModalSave = () => {};
  const openRechargeModal = (o: VipTableColumnTypes) => {
    setRechargeModalOpen(true);
  };
  return (
    <>
      <VipInfoModal
        mode={modalMode}
        open={modalOpen}
        closeModalCallback={closeModal}
        saveModalCallback={saveModal}
      ></VipInfoModal>
      <VipRechargeModal
        open={rechargeModalOpen}
        closeModalCallback={rechargeModalClose}
        saveModalCallback={rechargeModalSave}
      ></VipRechargeModal>
      <div className="vip-manage-page-container page-container">
        <div className="header">
          <Input suffix={<SearchOutlined />} />
          <Button>创建</Button>
          <Button type="primary" onClick={createVip}>
            创建
          </Button>
        </div>
        <div className="content">
          <Table<VipTableColumnTypes>
            rowKey="id"
            columns={columns}
            dataSource={VipTableData}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default VipManagePage;
