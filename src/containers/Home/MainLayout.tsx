import React, { ReactNode, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

const keys = [
  { key: "profile", name: "Shaxsiy accaunt" },
  { key: "users", name: "Faydalanuvchilar" },
  { key: "services", name: "Services" },
];
const items: MenuProps["items"] = [
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
].map((icon, index) => ({
  key: keys[index].key,
  icon: React.createElement(icon),
  label: keys[index].name,
}));

type AppProps = {
  children: ReactNode;
};

const MainLayout: React.FC<AppProps> = ({ children }) => {
  const [{ active }, setState] = useState<{ active: string }>({ active: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (active && location.pathname.endsWith(active)) return;
    let newActive = "";
    keys.map((item, index) => {
      if (location.pathname.endsWith(item.key)) {
        newActive = item.key;
        return;
      }
    });
    setState((state) => ({ ...state, active: newActive || "profil" }));
  }, [location.pathname]);

  return (
    <Layout hasSider>
      <Sider
        width={250}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="logo"
          style={{ padding: "10px 25px", color: "#3498db", fontSize: "20px" }}
        >
          <h1>ONLINE ARIZA</h1>
        </div>
        <Menu
          theme="dark"
          onSelect={(e) => navigate(e.key !== "profile" ? e.key : "")}
          mode="inline"
          items={items}
          selectedKeys={[`${active}`]}
        />
      </Sider>
      <Layout style={{ marginLeft: 250 }}>
        <Content
          style={{
            overflow: "initial",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
