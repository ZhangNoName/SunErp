import { FC, useState } from "react";
import "./homePage.css";
import { DataCard } from "@/components";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="home-page-container">
      <div className="sum-card-container">
        <DataCard title="销售金额" data={123456} />
        <DataCard title="订单数" data={123456} />
        <DataCard title="外卖单数" data={123456} />
        <DataCard title="库存预警" data={123456} />
      </div>
      <div className="data-visual-container"></div>
    </div>
  );
};

export default HomePage;
