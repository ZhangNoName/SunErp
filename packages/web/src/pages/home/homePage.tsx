import { FC, useState } from "react";
import "./homePage.css";
import { ChartCard, DataCard } from "@/components";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="home-page-container page-container">
      <div className="sum-card-container">
        <DataCard title="销售金额" data={123456} />
        <DataCard title="订单数" data={123456} />
        <DataCard title="外卖单数" data={123456} />
        <DataCard title="库存预警" data={123456} />
      </div>
      <div className="data-visual-container">
        <ChartCard title="销售商品类别统计" data={[]} />
        <ChartCard title="趋势分析" data={[]} />
      </div>
    </div>
  );
};

export default HomePage;
