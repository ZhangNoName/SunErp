import { FC, useState } from "react";
import "./side.css";
import { Button, Menu, MenuProps } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface SideMenuProps {}
type MenuItem = Required<MenuProps>["items"][number];

export const SideMenu: FC<SideMenuProps> = ({}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items: MenuItem[] = [
    { key: "home", icon: <PieChartOutlined />, label: "首页" },
    {
      key: "order",
      icon: <DesktopOutlined />,
      label: "点餐",
      onClick: () => navigate("/order"),
    },
    {
      key: "item",
      icon: <ContainerOutlined />,
      label: "商品",
      children: [
        {
          key: "item-price",
          label: "价格",
          onClick: () => navigate("/item/price"),
        },
        {
          key: "item-combo",
          label: "套餐",
          onClick: () => navigate("/item/combo"),
        },
        {
          key: "item-promot",
          label: "活动",
          onClick: () => navigate("/item/promot"),
        },
      ],
    },
    {
      key: "sale",
      icon: <ContainerOutlined />,
      label: "订单",
      onClick: () => navigate("/record"),
    },
    {
      key: "vip",
      icon: <ContainerOutlined />,
      label: "会员",
      children: [
        { key: "vip-manage", label: "会员管理" },
        { key: "vip-config", label: "积分设置" },
        { key: "vip-event", label: "会员活动" },
      ],
    },
    {
      key: "equip",
      icon: <ContainerOutlined />,
      label: "设备",
      onClick: () => navigate("/deviceConfig"),
    },
    {
      key: "system",
      icon: <ContainerOutlined />,
      label: "系统设置",
      onClick: () => navigate("/systemConfig"),
    },
  ];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="side-menu-container">
      <div className="collapse-btn" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="side-menu">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </div>
  );
};

export default SideMenu;
