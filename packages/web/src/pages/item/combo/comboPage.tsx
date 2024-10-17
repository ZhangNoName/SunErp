import { FC, useEffect, useMemo, useState } from "react";
import "./comboPage.css";
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
  DatePicker,
} from "antd";
import { PriceTableDataType } from "../pirce/pricePageData";
import { ComboTypes } from "@/type";
import { ItemDataTest, WeekDayList } from "@/util/TestData";
import TextArea from "antd/es/input/TextArea";
import { useWatch } from "antd/es/form/Form";
const { RangePicker } = DatePicker;
interface ComboPageProps {}
const InitFormValue = {
  name: "",
  type: "once",
  price: 0,
  discount: 0,
  discountPrice: 0,
  state: "上架",
  des: "",
};
interface SelectItemTableColumns {
  key: string;
  id: string;
  name: string;
  type: string;
  price: number;
  discount: number;
  discountPrice: number;
}
export const ComboPage: FC<ComboPageProps> = ({}) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const columns: TableColumnsType<ComboTypes> = [
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
          <a onClick={() => editcombo(record)}>修改</a>
        </div>
      ),
    },
  ];

  const ModalItemColumns: TableColumnsType<SelectItemTableColumns> = [
    { title: "名称", dataIndex: "name", key: "id", fixed: "left" },
    { title: "类别", dataIndex: "type", key: "type" },
    { title: "价格", dataIndex: "price", key: "price" },
    { title: "折扣", dataIndex: "discount", key: "discount" },
    { title: "折后价", dataIndex: "discountPrice", key: "discountPrice" },
    {
      title: "操作",
      dataIndex: "count",
      key: "x",
      fixed: "right",
      render: (text, record, index) => (
        <InputNumber
          value={selectItemMap[record.id]}
          min={1}
          step={1}
          onChange={(v) => handleItemCountChange(record.id, v)}
        />
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(true);
  const [modalTitle, setModalTitle] = useState("创建套餐");
  const [editId, setEditId] = useState<string>("");
  const [modalLoading, setModalLoading] = useState(false);
  const comboItems = Form.useWatch("items", form);
  const [selectItemMap, setSelectItemMap] = useState<{ [key: string]: number }>(
    {}
  );

  const ItemList = useMemo(() => {
    return ItemDataTest.filter((o) => o.type != "套餐").map((o) => {
      return {
        value: o.id,
        label: o.name,
      };
    });
  }, [ItemDataTest]);

  const selectedItemsTableData = useMemo(() => {
    return (
      ItemDataTest.filter((o) => comboItems?.includes(o.id)).map((o) => {
        return {
          key: o.id,
          id: o.id,
          name: o.name,
          type: o.type || "",
          price: o.price,
          discount: o.discount || 1,
          discountPrice: o.discountPrice,
        };
      }) || []
    );
  }, [comboItems]);
  const handleItemCountChange = (id: string, v: any) => {
    console.log("当前的选中数量", id, v);
    setSelectItemMap({
      ...selectItemMap,
      [id]: v,
    });
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const saveModal = () => {
    form
      .validateFields()
      .then(async (res) => {
        console.log("创建套餐表单校验", res);
        const startTime = res.time[0].format("YYYY-MM-DD");
        // const endTime = res.time[1].format("YYYY-MM-DD");
        console.log("套餐起止时间", startTime);
      })
      .catch((e) => {
        console.log("创建套餐失败", e);
        message.warning("创建失败，请检查输入信息是否正确！");
      })
      .finally(() => {
        // setLoading(false);
        // closeModal();
      });
  };
  const addcombo = () => {
    setModalTitle("创建套餐");
    setModalOpen(true);
  };
  const addItem = (item: any) => {};
  const editcombo = (item: ComboTypes) => {
    console.log("修改的套餐配置", item);
    setModalTitle("修改套餐");
    setEditId(item.id);
    form.setFieldsValue({
      ...item,
    });
    setModalOpen(true);
  };
  const deletePrompt = (item: ComboTypes) => {
    api.warning({
      message: `确认终止套餐${item.name}？`,
      description: "终止之后套餐将暂停，确定终止吗？",
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
      discount: (price / value).toFixed(2),
    });
  };

  const handleDiscountChange = (value: any) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      discountPrice: (price * value).toFixed(2),
    });
  };
  const handleItemsChange = (value: string[]) => {
    setSelectItemMap((prevState) => {
      const newState: { [key: string]: number } = {};
      // 添加或更新新选择的项
      value.forEach((o) => {
        newState[o] = prevState[o] ?? 1;
      });
      return newState;
    });
  };
  useEffect(() => {
    // console.log("selectItemMap", selectItemMap);

    const totalPrice = Object.entries(selectItemMap).reduce(
      (pre, [key, value]) => {
        pre +=
          value *
          (selectedItemsTableData.find((o) => o.id == key)?.discountPrice || 0);
        return pre;
      },
      0
    );

    form.setFieldsValue({
      price: totalPrice,
    });
  }, [selectItemMap]);

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
          <Form.Item name="time" label="有效期">
            <RangePicker
              format="YYYY-MM-DD"
              allowEmpty={[false, true]}
              placeholder={["", "永久"]}
            />
          </Form.Item>
          <Form.Item name="week" label="周">
            <Checkbox.Group options={WeekDayList}></Checkbox.Group>
          </Form.Item>

          <Form.Item name="items" label="商品">
            <Checkbox.Group options={ItemList} onChange={handleItemsChange} />
          </Form.Item>
          <Form.Item label="定价">
            <Row>
              <Col span={8}>
                <Form.Item name="price" label="推荐价格">
                  <InputNumber disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="discount" label="折扣">
                  <InputNumber
                    min={0}
                    step={0.05}
                    max={1}
                    precision={2}
                    onChange={handleDiscountChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="discountPrice" label="折后价格">
                  <InputNumber
                    min={0}
                    step={1}
                    precision={2}
                    onChange={handleDiscountPriceChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="套餐内容">
            <Table<SelectItemTableColumns>
              pagination={false}
              columns={ModalItemColumns}
              dataSource={selectedItemsTableData}
            />
          </Form.Item>
          <Form.Item name="des" label="备注">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <div className="combo-page-container">
        <div className="header">
          <Input></Input>
          <Button type="primary" onClick={addcombo}>
            新建套餐
          </Button>
        </div>
        <div className="content">
          <Table<ComboTypes>
            pagination={false}
            columns={columns}
            dataSource={[]}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default ComboPage;
