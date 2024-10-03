import { useMemo, useState } from "react";
import "./App.css";
import { ELayout, SideMenu } from "./layout";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HomePage, LoginPage } from "./pages";
import { Menu } from "antd";
function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App></App>} />
      </Routes>
    </BrowserRouter>
  );
}
function App() {
  const location = useLocation(); // 获取当前路由信息

  // 计算 needHeader，根据当前路径是否为 "/login"
  const needHeader = useMemo(
    () => location.pathname !== "/login",
    [location.pathname]
  );
  return (
    <>
      <ELayout needHeader={needHeader}>
        <div className="app-content">
          <aside className="layout-main-side">
            <SideMenu />
          </aside>
          <div className="layout-main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              {/* 捕获未知路径，重定向到登录页或主页 */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </div>
      </ELayout>
    </>
  );
}

export default AppWrapper;
