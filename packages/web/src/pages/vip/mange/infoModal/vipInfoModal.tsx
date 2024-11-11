import { FC, useEffect, useState } from "react";
import "./VipInfoModal.css";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  message,
  notification,
} from "antd";
import { ItemTypesList, ItemStateList } from "@/util/TestData";
import form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import { VipState } from "../../vip.data";

interface VipInfoModalProps {
  open: boolean;
  closeModalCallback: Function;
  saveModalCallback: Function;
  mode: "add" | "edit";
}
const InitFormValue = {
  name: "",
  state: "enable",
  balance: 0,
  points: 0,
  phone: "",
  des: "",
  password: "123456789",
};
export const VipInfoModal: FC<VipInfoModalProps> = ({
  open,
  closeModalCallback,
  saveModalCallback,
  mode,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState("添加Vip");
  const [modalLoading, setModalLoading] = useState(false);

  const closeModal = () => {
    closeModalCallback();
  };
  const saveModal = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("表单校验", values);
        setModalLoading(true);
        saveModalCallback();
      })
      .catch((e) => {
        console.log("表单校验失败", e);
        message.warning("添加失败，请检查输入信息是否正确！");
      });
  };
  useEffect(() => {
    setModalTitle(mode === "add" ? "添加Vip" : "编辑Vip");
  }, [mode]);
  return (
    <>
      <Modal
        className="vip-info-modal-container"
        title={modalTitle}
        width="55rem"
        open={open}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" loading={modalLoading} onClick={closeModal}>
            取消
          </Button>,
          <Button
            loading={modalLoading}
            key="submit"
            type="primary"
            onClick={saveModal}
          >
            确定
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={InitFormValue}
          form={form}
          name="vipInfoForm"
          layout="horizontal"
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="初始密码">
            {/* <Input variant="borderless" /> */}
            <div>123456789</div>
          </Form.Item>
          <Form.Item name="balance" label="初始金额">
            <InputNumber precision={2} min={0} />
          </Form.Item>
          <Form.Item name="points" label="初始积分">
            <InputNumber precision={0} min={0} />
          </Form.Item>
          <Form.Item name="state" label="账号状态">
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={VipState}
            />
          </Form.Item>
          <Form.Item name="des" label="备注">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VipInfoModal;
