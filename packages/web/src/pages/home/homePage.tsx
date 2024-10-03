import { FC, useState } from "react";
import "./homePage.css";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="home-page-container">
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
