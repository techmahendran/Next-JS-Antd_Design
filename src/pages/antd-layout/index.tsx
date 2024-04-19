
import React, { useState } from "react";
import styles from "./layout.module.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

const LayOutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("1"); // Initial selected menu key

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: any) => {
    setSelectedMenuKey(e.key);
  };

  const renderContent = () => {
    switch (selectedMenuKey) {
      case "1":
        return <div>Content for nav 1</div>;
      case "2":
        return <div>Content for nav 2</div>;
      case "3":
        return <div>Content for nav 3</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          padding: 0px !important;
        }
      `}</style>
      <Layout className={styles.main}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[selectedMenuKey]}
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayOutPage;
