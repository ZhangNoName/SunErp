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
import SettingPage from "./pages/setting/settingPage";
import DevicePage from "./pages/device/devicePage";
import PromotPage from "./pages/item/promot/promotPage";
import ComboPage from "./pages/item/combo/comboPage";
import PricePage from "./pages/item/pirce/pricePage";
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

              <Route path="/item/price" element={<PricePage />} />
              <Route path="/item/combo" element={<ComboPage />} />
              <Route path="/item/promot" element={<PromotPage />} />

              <Route path="/deviceConfig" element={<DevicePage />} />
              <Route path="/systemConfig" element={<SettingPage />} />

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
