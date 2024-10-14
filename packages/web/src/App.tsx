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
import OrderPage from "./pages/order/orderPage";
function App() {
  const layoutDom = (
    <>
      <ELayout>
        <div className="app-content">
          <aside className="layout-main-side">
            <SideMenu />
          </aside>
          <div className="layout-main-content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/order" element={<OrderPage />} />

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </div>
      </ELayout>
    </>
  );
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={layoutDom}></Route>
      </Routes>
    </>
  );
}

export default App;
