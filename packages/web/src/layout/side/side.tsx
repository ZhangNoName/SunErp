import { FC, useEffect, useState } from "react";
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
import { useMount } from "ahooks";

interface SideMenuProps {}
type MenuItem = Required<MenuProps>["items"][number];

export const SideMenu: FC<SideMenuProps> = ({}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

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
      key: "record",
      icon: <ContainerOutlined />,
      label: "订单",
      onClick: () => navigate("/record"),
    },
    {
      key: "vip",
      icon: <ContainerOutlined />,
      label: "会员",
      children: [
        {
          key: "vip-manage",
          label: "会员管理",
          onClick: () => navigate("/vip/manage"),
        },
        {
          key: "vip-config",
          label: "积分设置",
          onClick: () => navigate("/vip/config"),
        },
        { key: "vip-event", label: "会员活动" },
      ],
    },
    {
      key: "device",
      icon: <ContainerOutlined />,
      label: "设备",
      onClick: () => navigate("/device"),
    },
    {
      key: "system",
      icon: <ContainerOutlined />,
      label: "系统设置",
      onClick: () => navigate("/system"),
    },
  ];
  const selectMenuHandle = (info: any) => {
    // console.log("info", info);
    setSelectedKeys(info.key);
  };
  const openMenuHandle = (info: any) => {
    // console.log("info", info);
    setOpenKeys(info);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useMount(() => {
    const path = window.location.pathname.split("/");
    path.shift();
    setOpenKeys(path);
    setSelectedKeys([path.join("-")]);
    console.log("path", path.join("-"));
  });
  return (
    <div className="side-menu-container">
      <div className="collapse-btn" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="side-menu">
        <Menu
          // defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={selectedKeys}
          onSelect={selectMenuHandle}
          openKeys={openKeys}
          onOpenChange={openMenuHandle}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </div>
  );
};

export default SideMenu;
