import { FC, useState } from "react";
import "./vipRechargeModal.css";
import { Button, Form, InputNumber, Modal, message } from "antd";

interface VipRechargeModalProps {
  open: boolean;
  closeModalCallback: Function;
  saveModalCallback: Function;
}

export const VipRechargeModal: FC<VipRechargeModalProps> = ({
  open,
  closeModalCallback,
  saveModalCallback,
}) => {
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState("添加Vip");
  const [modalLoading, setModalLoading] = useState(false);
  const count = Form.useWatch("count", form);
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
  return (
    <>
      <Modal
        title="vip充值"
        width="55rem"
        className="vip-recharge-modal-container"
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            count: 0,
          }}
          form={form}
          name="vipRechargeForm"
          layout="horizontal"
          autoComplete="off"
        >
          <Form.Item
            name="count"
            label="金额"
            rules={[{ required: true, message: "请输入金额!" }]}
          >
            <InputNumber precision={2} min={0} />
          </Form.Item>
          <div className="recharge-btn-container">
            <Button loading={modalLoading} type="primary" onClick={saveModal}>
              现金
            </Button>

            <Button loading={modalLoading} type="primary" onClick={saveModal}>
              扫码收款
            </Button>

            <Button loading={modalLoading} type="primary" onClick={saveModal}>
              收款码充值
            </Button>
          </div>
          <div className="recharge-info">
            <p>{"充值金额：" + count}</p>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VipRechargeModal;
