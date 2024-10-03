import { FC, useMemo, useState } from "react";
import "./user.css";
import { useNavigate } from "react-router-dom";
import { useMount, useUnmount } from "ahooks";
import EventBus from "@/util/eventEmitter";
import { Avatar, Dropdown, MenuProps } from "antd";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

export const EUser: FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "张小小",
    avator: "",
    email: "",
  });
  const logOut = () => {
    localStorage.removeItem("user_info");
    localStorage.removeItem("google_user_info");
    localStorage.removeItem("token");
    navigate("/");
  };
  const menuList: MenuProps["items"] = [
    {
      key: "0",
      onClick: () => navigate("/home"),
      label: <div>首页</div>,
      icon: <HomeOutlined />,
    },
    {
      key: "1",
      onClick: () => navigate("/self-center"),
      label: <div>个人中心</div>,
      icon: <UserOutlined />,
    },

    {
      key: "2",
      onClick: logOut,
      label: <div>退出登录</div>,
      icon: <LogoutOutlined />,
    },
  ];
  useMount(() => {
    EventBus.on("logout", logOut);
    const user = JSON.parse(localStorage.getItem("user_info") || "{}");
    if (user) {
      // console.log("获取的用户信息", user);
      setUserInfo({
        name: user.username,
        avator: user.avator,
        email: user.email,
      });
    }
  });
  useUnmount(() => {
    EventBus.off("logout", logOut);
  });
  return (
    <Dropdown
      menu={{ items: menuList }}
      trigger={["hover"]}
      className="e-user"
      overlayClassName="e-user-info-dropdown"
    >
      <Avatar
        icon={<UserOutlined />}
        crossOrigin="anonymous"
        src={userInfo?.avator}
        alt={userInfo?.name}
      >
        {userInfo.name}
      </Avatar>
    </Dropdown>
  );
};
export default EUser;
