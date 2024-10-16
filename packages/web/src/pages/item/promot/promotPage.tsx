import { FC, useMemo, useState } from "react";
import "./promotPage.css";
import {
  Input,
  Button,
  Table,
  notification,
  Form,
  TableColumnsType,
  InputNumber,
  Radio,
  Modal,
  Space,
  message,
  RadioChangeEvent,
  Row,
  Col,
  Select,
  Checkbox,
} from "antd";
import { PriceTableDataType } from "../pirce/pricePageData";
import { PromotTypes } from "@/type";
import { ItemDataTest, PromotTypeList } from "@/util/TestData";
import TextArea from "antd/es/input/TextArea";

interface PromotPageProps {}
const InitFormValue = {
  name: "",
  type: "",
  price: 0,
  discount: 0,
  discountPrice: 0,
  state: "上架",
  des: "",
};
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
          <a onClick={() => deletePrompt(record)}>终止</a>
          <a onClick={() => editPromot(record)}>修改</a>
        </div>
      ),
    },
  ];

  const ModalItemColumns: TableColumnsType<PriceTableDataType> = [
    { title: "名称", dataIndex: "name", key: "id", fixed: "left" },
    { title: "类别", dataIndex: "type", key: "type" },
    { title: "价格", dataIndex: "price", key: "price" },
    { title: "折扣", dataIndex: "discount", key: "discount" },
    { title: "折后价", dataIndex: "discountPrice", key: "discountPrice" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      fixed: "right",
      render: (text, record, index) => (
        <div className="action-group">
          <a onClick={() => addItem(record)}>下架</a>
          <a onClick={() => addItem(record)}>修改</a>
        </div>
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(true);
  const [modalTitle, setModalTitle] = useState("创建活动");
  const [editId, setEditId] = useState<string>("");
  const [modalLoading, setModalLoading] = useState(false);

  const ItemList = useMemo(() => {
    return ItemDataTest.filter((o) => o.type != "套餐").map((o) => {
      return {
        value: o.id,
        label: o.name,
      };
    });
  }, [ItemDataTest]);

  const closeModal = () => {
    setModalOpen(false);
  };
  const saveModal = () => {
    form
      .validateFields()
      .then(async (res) => {
        console.log("创建活动表单校验", res);
      })
      .catch((e) => {
        console.log("创建活动失败", e);
        message.warning("创建失败，请检查输入信息是否正确！");
      })
      .finally(() => {
        // setLoading(false);
        // closeModal();
      });
  };
  const addPromot = () => {
    setModalTitle("创建活动");
    setModalOpen(true);
  };
  const addItem = (item: any) => {};
  const editPromot = (item: PromotTypes) => {
    console.log("修改的活动配置", item);
    setModalTitle("修改活动");
    setEditId(item.id);
    form.setFieldsValue({
      ...item,
    });
    setModalOpen(true);
  };
  const deletePrompt = (item: PromotTypes) => {
    api.warning({
      message: `确认终止活动${item.name}？`,
      description: "终止之后活动将暂停，确定终止吗？",
      btn: (
        <Space>
          <Button type="link" size="small" onClick={() => api.destroy()}>
            取消
          </Button>
          <Button type="primary" size="small" onClick={deleteItemById}>
            终止
          </Button>
        </Space>
      ),
      placement: "top",

      onClose: () => {
        api.destroy();
      },
    });
  };
  const deleteItemById = () => {
    console.log("deleteItemById");
  };

  const handleTypeChange = (v: RadioChangeEvent) => {
    if (v.target.value == "单次") {
    } else {
    }
  };
  const handleDiscountPriceChange = (value: any) => {
    const price = form.getFieldValue("price") || 1;
    form.setFieldsValue({
      discount: price / value,
    });
  };

  const handleDiscountChange = (value: any) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      discountPrice: price * value,
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={modalTitle}
        width="55vw"
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
              options={PromotTypeList}
              onChange={handleTypeChange}
            />
          </Form.Item>
          <Form.Item name="items" label="商品">
            <Checkbox.Group options={ItemList} />
          </Form.Item>
          <Form.Item label="定价">
            <Row>
              <Col span={8}>
                <Form.Item name="price" label="推荐价格">
                  <InputNumber changeOnWheel min={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="discount" label="折扣">
                  <InputNumber min={0} onChange={handleDiscountChange} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="discountPrice" label="折后价格">
                  <InputNumber onChange={handleDiscountPriceChange} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="套餐内容">
            <Table columns={ModalItemColumns} dataSource={[]} />
          </Form.Item>
          <Form.Item name="des" label="备注">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
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
