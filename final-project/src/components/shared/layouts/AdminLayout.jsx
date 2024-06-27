import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col } from "antd";

const { Header, Content, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical text-white text-base">
          Word Wizard
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <div>
          <Row>
            <Col span={18}>
              <Content
                style={{
                  margin: "24px 16px 0",
                  overflow: "initial",
                }}
              >
                <div
                  style={{
                    padding: 24,
                    textAlign: "center",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <p>long content</p>
                </div>
              </Content>
            </Col>
            <Col span={6}>
              <Content
                style={{
                  margin: "24px 16px 0",
                  overflow: "initial",
                }}
              >
                <div
                  style={{
                    padding: 24,
                    textAlign: "center",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <p>long content</p>
                </div>
              </Content>
            </Col>
          </Row>
        </div>

        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default MainLayout;
