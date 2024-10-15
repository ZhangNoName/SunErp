import { FC, useState } from "react";
import "./pricePage.css";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
  message,
  notification,
} from "antd";
import { ItemProps } from "@/type";
import { PriceTableData, PriceTableDataType } from "./pricePageData";
import TextArea from "antd/es/input/TextArea";
import { ItemStateList, ItemTypesList } from "@/util/TestData";

interface PricePageProps {}
const InitFormValue = {
  name: "",
  type: "1",
  price: 1,
  discount: 1,
  discountPrice: 1,
  state: "enable",
  stock: 0,
  lastStockDate: "",
  des: "",
};
export const PricePage: FC<PricePageProps> = ({}) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const columns: TableColumnsType<PriceTableDataType> = [
    { title: "名称", dataIndex: "name", key: "id", fixed: "left" },
    { title: "照片", dataIndex: "image", key: "image" },
    { title: "状态", dataIndex: "state", key: "state" },
    { title: "类别", dataIndex: "type", key: "type" },
    { title: "价格", dataIndex: "price", key: "price" },
    { title: "折扣", dataIndex: "discount", key: "discount" },
    { title: "折后价", dataIndex: "discountPrice", key: "discountPrice" },
    { title: "库存", dataIndex: "stock", key: "stock" },
    { title: "上次进货日期", dataIndex: "lastStockDate", key: "lastStockDate" },
    // { title: "口味", dataIndex: "address", key: "type" },
    { title: "描述", dataIndex: "des", key: "des" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      fixed: "right",

      render: (text, record, index) => (
        <div className="action-group">
          <a onClick={() => deleteItem(record)}>下架</a>
          <a onClick={() => editItem(record)}>修改</a>
        </div>
      ),
    },
  ];
  const [modalOpen, setModalOpen] = useState(true);
  const [modalTitle, setModalTitle] = useState("添加商品");
  const [editId, setEditId] = useState<string>("");
  const [modalLoading, setModalLoading] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const saveModal = () => {
    form
      .validateFields()
      .then(async (res) => {
        console.log("添加商品表单校验", res);
      })
      .catch((e) => {
        console.log("添加失败", e);
        message.warning("添加失败，请检查输入信息是否正确！");
      })
      .finally(() => {
        // setLoading(false);
        // closeModal();
      });
  };
  const editItem = (item: PriceTableDataType) => {
    console.log("editItem");
    setModalTitle("修改商品");
    setEditId(item.id);
    form.setFieldsValue({
      ...item,
    });
    setModalOpen(true);
  };
  const addItem = () => {
    setModalTitle("添加商品");
    setModalOpen(true);
  };
  const deleteItem = (item: PriceTableDataType) => {
    api.warning({
      message: `确认下架商品${item.name}？`,
      description: "下架之后无法出售，确定删除吗？",
      btn: (
        <Space>
          <Button type="link" size="small" onClick={() => api.destroy()}>
            取消
          </Button>
          <Button type="primary" size="small" onClick={deleteItemById}>
            下架
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
  const handlePriceChange = (value: any) => {
    const discount = form.getFieldValue("discount") || 1;
    form.setFieldsValue({
      discountPrice: value * discount,
    });
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
            <InputNumber changeOnWheel min={0} onChange={handlePriceChange} />
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
      <div className="price-page-container">
        <div className="header">
          <Input></Input>
          <Button type="primary" onClick={addItem}>
            添加套餐
          </Button>
          <Button type="primary" onClick={addItem}>
            添加商品
          </Button>
        </div>
        <div className="content">
          <Table<PriceTableDataType>
            pagination={false}
            columns={columns}
            dataSource={PriceTableData}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default PricePage;
