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

interface SideMenuProps {}
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "home", icon: <PieChartOutlined />, label: "首页" },
  { key: "oeder", icon: <DesktopOutlined />, label: "点餐" },
  {
    key: "item",
    icon: <ContainerOutlined />,
    label: "商品",
    children: [
      { key: "item-price", label: "价格" },
      { key: "item-combo", label: "套餐" },
      { key: "item-promot", label: "活动" },
    ],
  },
  {
    key: "sale",
    icon: <ContainerOutlined />,
    label: "订单",
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
  },
  {
    key: "system",
    icon: <ContainerOutlined />,
    label: "系统设置",
  },
];
export const SideMenu: FC<SideMenuProps> = ({}) => {
  const [collapsed, setCollapsed] = useState(false);

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
