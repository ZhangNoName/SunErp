import { FC, ReactNode, useState } from "react";
import "./ELayout.css";
import EHeader from "./header/header";

interface LayoutProps {
  needHeader?: boolean;
  header?: ReactNode;
  children: ReactNode;
  needMenu?: boolean;
}

export const ELayout: FC<LayoutProps> = ({
  needHeader = true,
  needMenu = true,
  header,
  children,
}) => {
  return (
    <div className="layout-container">
      {needHeader && (
        <header className="layout-header">
          {header ? header : <EHeader />}
        </header>
      )}
      <main className="layout-main">{children}</main>
    </div>
  );
};

export default ELayout;
