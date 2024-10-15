import { FC, useEffect, useState } from "react";
import "./comboModal.css";
import { Button, Form, Input, InputNumber, Modal, Radio } from "antd";
import { ItemTypesList, ItemStateList } from "@/util/TestData";
import form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";

interface ComboModalProps {
  closeCallback?: () => void;
  id?: string;
}

export const ComboModal: FC<ComboModalProps> = ({ closeCallback, id }) => {
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const saveModal = () => {
    closeModal();
  };
  useEffect(() => {}, [id]);
  const handleDiscountPriceChange = (value: any) => {
    const price = form.getFieldValue("price") || 1;
    form.setFieldsValue({
      discount: 1 - price / value || 0,
    });
  };

  const handleDiscountChange = (value: any) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      discountPrice: price * value,
    });
  };
  return (
    <Modal
      className="combo-modal-container"
      title={modalTitle}
      width="55rem"
      open={modalOpen}
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
        name="itemForm"
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
        <Form.Item name="type" label="类别">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={ItemTypesList}
          />
        </Form.Item>
        <Form.Item name="price" label="价格">
          <InputNumber disabled />
        </Form.Item>
        <Form.Item name="discount" label="折扣">
          <InputNumber min={0} onChange={handleDiscountChange} />
        </Form.Item>
        <Form.Item name="discountPrice" label="折后价格">
          <InputNumber onChange={handleDiscountPriceChange} />
        </Form.Item>
        <Form.Item name="state" label="是否上架">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={ItemStateList}
          />
        </Form.Item>
        <Form.Item name="des" label="描述">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ComboModal;
