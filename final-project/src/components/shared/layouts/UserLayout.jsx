import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  BookOutlined,
  TranslationOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Col, theme } from "antd";
import TrackCalendar from "../../materials/Calendar";
import SimpleCard from "../../shared/common/Card/SimpleCard";

const { Header, Content, Sider } = Layout;

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
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: <Link to="/user/home">Home</Link>,
            },
            {
              key: "handbook",
              icon: <BookOutlined />,
              label: <Link to="/user/handbook">Handbook</Link>,
            },
            {
              key: "dictionary",
              icon: <TranslationOutlined />,
              label: <Link to="/user/dictionary">Dictionary</Link>,
            },
            {
              key: "review",
              icon: <BarChartOutlined />,
              label: <Link to="/user/review">Review</Link>,
            },
            {
              key: "create-course",
              icon: <AppstoreOutlined />,
              label: <Link to="/user/create-course">Create Course</Link>,
            },
            {
              key: "profile",
              icon: <UserOutlined />,
              label: <Link to="/user/profile">Profile</Link>,
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: <Link to="/user/settings">Settings</Link>,
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: <Link to="/sign-in">Logout</Link>,
            },
          ]}
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
                  minHeight: "100vh",
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
                  <Outlet />
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
                  {location.pathname === "/user/home" && <TrackCalendar /> && (
                      <SimpleCard title="You have learned" content="11 words" />
                    ) && (
                      <SimpleCard
                        title="You have studied continuously for"
                        content="1 day"
                      />
                    )}
                </div>
              </Content>
            </Col>
          </Row>
        </div>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
