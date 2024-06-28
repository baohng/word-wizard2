import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "antd";
import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";

import ListEditTopic from "../Topic/ListEditTopic";

const { Search } = Input;
const CourseDetail = () => {
  let { courseId } = useParams();
  // course state
  const [course, setCourse] = useState({});
  const [showTopicForm, setShowTopicForm] = useState(false);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  // Fetch course details when component mounts or courseId changes
  useEffect(() => {
    // Function to fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/courses/${courseId}/topics`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleStartToLearn = () => {
    // Example: Navigate to the first topic of the course
    // This assumes you have a route set up for '/course/:courseId/topic/:topicId'
    // You would replace 'courseId' and '1' with dynamic values as needed
    navigate(`/user/courses/${courseId}/1`);

    // Alternatively, you could perform other actions here,
    // such as updating user progress in a database, etc.
  };

  return (
    <div>
      <h1>{course.name}</h1>

      <div className="flex justify-end mb-10">
        {!showTopicForm && (
          <Search
            className="mr-4 mt-0.5"
            placeholder="Search topic"
            onSearch={""}
            enterButton
            style={{
              width: 400,
            }}
          />
        )}

        {userRole === "TEACHER" && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowTopicForm(!showTopicForm)}
          >
            {showTopicForm ? "Back to all topics" : "Create Topic"}
          </button>
        )}
      </div>
      {showTopicForm ? (
        <CreateTopicForm courseId={courseId} />
      ) : (
        <ListEditTopic />
      )}

      {userRole === "STUDENT" && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartToLearn}
        >
          Start to learn
        </button>
      )}
    </div>
  );
};

export default CourseDetail;
