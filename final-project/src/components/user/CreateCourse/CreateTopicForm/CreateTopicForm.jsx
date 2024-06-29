/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

const CreateTopicForm = ({ courseId }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Then, include the imageUrl in the course data and send it to the server
      const response = await fetch(
        `http://localhost:8080/api/courses/${courseId}/create-topic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            meaningInVietnamese: values.meaningInVietnamese,
          }),
        }
      );
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Topic added successfully!", data);
      navigate(`/user/courses/${courseId}/${data.id}`);
    } catch (error) {
      console.error("There was an error creating the topic:", error);
    }
  };

  const onFinish = async (values) => {
    // Construct the courseData object from form values, including fileList
    const topicData = {
      name: values.name,
      meaningInVietnamese: values.meaningInVietnamese,
    };

    console.log("Received values of form: ", topicData);
    // Call handleSubmitButton with the courseData
    await handleSubmit(topicData);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Form
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            minWidth: 800,
            maxWidth: 1000,
          }}
        >
          <Form.Item
            label="Topic name"
            name="name"
            rules={[
              { required: true, message: "Please input the topic name!" },
            ]}
          >
            <Input placeholder="ex: Fashion" />
          </Form.Item>
          <Form.Item
            label="Meaning in Vietnamese"
            name="meaningInVietnamese"
            rules={[
              {
                required: true,
                message: "Please input the meaning...!",
              },
            ]}
          >
            <TextArea rows={6} placeholder="ex: Thời trang" />
          </Form.Item>
          <Form.Item className="" wrapperCol={{ offset: 4, span: 14 }}>
            <div>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default CreateTopicForm;
