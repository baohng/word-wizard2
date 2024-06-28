import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
// import { Avatar } from "antd";

// const defaultImageUrl = `https://api.dicebear.com/7.x/miniavs/svg?seed=1`;

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

const ListCommon = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCourses();
  }, []);

  return (
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
      dataSource={courses}
      renderItem={(course) => (
        <List.Item
          style={{
            border: "4px solid #f0f0f0",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
          key={course.id}
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
            // avatar={<Avatar src={item.avatar} />}
            title={<a>{course.name}</a>}
            description={course.description}
          />
          {course.description}
        </List.Item>
      )}
    />
  );
};

export default ListCommon;
