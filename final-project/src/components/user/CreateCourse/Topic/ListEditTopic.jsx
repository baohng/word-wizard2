import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const fetchTopicsByCourse = async (courseId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/courses/${courseId}/topics`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const ListEditTopic = () => {
  const [topics, setTopics] = useState([]);
  const courseId = useParams().courseId;

  useEffect(() => {
    const fetchAndSetTopics = async () => {
      if (!courseId) {
        // Optionally handle the case where courseId is not defined
        console.log("courseId is undefined, skipping fetch");
        return;
      }
      const fetchedTopics = await fetchTopicsByCourse(courseId);
      if (fetchedTopics) {
        setTopics(fetchedTopics);
      }
    };

    fetchAndSetTopics();
  }, [courseId]); // Re-run this effect if courseId changes

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={topics}
      renderItem={(topics) => (
        <List.Item className="text-left">
          <Link
            to={`http://localhost:5173/user/courses/${courseId}/${topics.id}`}
          >
            <Card title={topics.name}>{topics.meaningInVietnamese}</Card>
          </Link>
        </List.Item>
      )}
    />
  );
};
export default ListEditTopic;
