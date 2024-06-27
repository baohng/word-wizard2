/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

const CreateCourseForm = (props) => {
  const handleSubmit = async (values) => {
    try {
      // Then, include the imageUrl in the course data and send it to the server
      const response = await fetch("http://localhost:8080/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      props.onFormSubmit();
      console.log("Course created successfully!", data);
    } catch (error) {
      console.error("There was an error creating the course:", error);
    }
  };

  const onFinish = async (values) => {
    // Construct the courseData object from form values, including fileList
    const courseData = {
      name: values.name,
      description: values.description,
      fileList: values.fileList?.map((file) => ({
        uid: file.uid,
        name: file.name,
        // Add other file properties as needed, excluding non-serializable ones
      })),
      // Include other fields as necessary
    };
    // Call handleSubmitButton with the courseData
    await handleSubmit(courseData);
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
            label="Course name"
            name="name"
            rules={[
              { required: true, message: "Please input the course name!" },
            ]}
          >
            <Input placeholder="ex: English vocab for TOEIC" />
          </Form.Item>
          <Form.Item
            label="Course description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the course description!",
              },
            ]}
          >
            <TextArea rows={6} placeholder="ex: This course mainly about..." />
          </Form.Item>
          <Form.Item label="Image" valuePropName="fileList"></Form.Item>
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
export default CreateCourseForm;
