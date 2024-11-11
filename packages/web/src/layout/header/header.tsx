import { FC, useState } from "react";
import "./header.css";
import { LogoSvg } from "@/icons";
import EUser from "./user/user";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import EventBus from "@/util/eventEmitter";

interface EHeaderProps {}

const EHeader: FC<EHeaderProps> = ({}) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    EventBus.emit("collapse-menu");
  };
  return (
    <div className="e-header-container">
      <div className="e-header-left">
        <div className="logo">
          <LogoSvg height={"3rem"} width={"3rem"} />
        </div>
        <div className="des">小小汉堡店</div>
        <div className="collapse-btn" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className="e-header-right">
        <EUser></EUser>
      </div>
    </div>
  );
};

export default EHeader;
