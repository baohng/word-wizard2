import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `Ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
import PropTypes from "prop-types";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

IconText.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

const ListCommon = () => (
  <List
    className="text-left"
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        style={{
          border: "4px solid #f0f0f0",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
        key={item.title}
        actions={[
          <IconText
            icon={StarOutlined}
            text="156"
            key="list-vertical-star-o"
          />,
          <IconText
            icon={LikeOutlined}
            text="156"
            key="list-vertical-like-o"
          />,
          <IconText
            icon={MessageOutlined}
            text="2"
            key="list-vertical-message"
          />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          className="text-left"
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default ListCommon;
