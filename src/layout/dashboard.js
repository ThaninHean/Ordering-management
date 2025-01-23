import React, { useState } from "react";
import { Layout, Menu as AntdMenu } from "antd";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import OverviewPage from "./over_view_page";
import OrderHistoryPage from "./order_history";
import MenuList from "./menu";

import { Button, Menu as AntdDropdownMenu, Dropdown } from "antd";
import logo from "../assets/Image/rest.png";

import {
  DashboardOutlined,
  MenuFoldOutlined,
  OrderedListOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  HistoryOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

// Helper function to create menu items
function getItem(label, key, icon, children, link) {
  return {
    label: link ? <Link to={link}>{label}</Link> : label,
    key,
    icon,
    children,
  };
}

// Define menu items with routing links
const items = [
  getItem("Overview", "1", <DashboardOutlined />, null, "/dashboard/overview"),
  getItem(
    "Order History",
    "6",
    <HistoryOutlined />,
    null,
    "/dashboard/order-history"
  ),
  getItem("Menu", "2", <MenuFoldOutlined />,
    null,
    "/dashboard/menu",
  ),
  getItem("Orders", "3", <OrderedListOutlined />),
  getItem("Customer", "4", <UserOutlined />, [getItem("Customer List", "4.1")]),
  getItem("Team", "5", <TeamOutlined />, [
    getItem("Team List", "5.1"),
    getItem("Team Profile", "5.2"),
  ]),
  getItem("Messages", "8", <MessageOutlined />),
  getItem("Settings", "7", <SettingOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuOpen = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };
  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-gray-800"
        style={{ position: "fixed", height: "100vh", top: 0, left: 0 }}
      >
        <div className="h-16 flex items-center justify-center text-white text-xl font-bold">
          Neary Khmer
        </div>
        <AntdMenu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="bg-gray-800"
        />
      </Sider>

      {/* Main Layout */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200, minHeight: "100vh" }}>
        {/* Header */}
        <Header
          className="bg-white shadow-md p-0 flex items-center"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        >
          <h1 className="ml-4 text-lg font-semibold">Dashboard Header</h1>
          <div style={{ marginLeft: "auto", marginRight: "16px" }}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <img src={logo} className="w-12 h-12 rounded-full bg-white"/>
            </Button>
            <Dropdown
              overlay={
                <AntdDropdownMenu onClick={handleMenuClose}>
                  <AntdDropdownMenu.Item key="1">My Account</AntdDropdownMenu.Item>
                  <AntdDropdownMenu.Item key="2">Settings</AntdDropdownMenu.Item>
                  <AntdDropdownMenu.Item key="3">Profile</AntdDropdownMenu.Item>
                  <AntdDropdownMenu.Item key="4">Logout</AntdDropdownMenu.Item>
                </AntdDropdownMenu>
              }
              open={menuVisible}
              onOpenChange={setMenuVisible}
            />
          </div>
        </Header>
        <Content
          style={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}
        >
          <Routes>
            <Route path="overview" element={<OverviewPage />} />
            <Route path="order-history" element={<OrderHistoryPage />} />
            {/* Add more routes here for other pages */}
          </Routes>
        </Content>

        {/* Footer */}
        <Footer className="text-center bg-gray-100">
          Neary Restaurant ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
