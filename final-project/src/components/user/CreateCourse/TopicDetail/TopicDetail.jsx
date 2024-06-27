import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import ListEditWord from "./ListEditWord/ListEditWord";

const TopicDetail = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // const { topicId } = useParams();

  // useEffect(() => {
  //   const fetchTopicDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/api/topics/${topicId}/`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("word: ", data);
  //       // Set state with fetched topic details
  //     } catch (error) {
  //       console.error("Error fetching topic details: ", error);
  //     }
  //   };

  //   if (topicId) {
  //     fetchTopicDetails();
  //   }
  // }, [topicId]);

  // const addWordToTopic = async (topicId, wordData) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/api/topics/${topicId}/add-word`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(wordData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Word added successfully:", data);
  //     // Optionally, update your UI here to reflect the added word
  //   } catch (error) {
  //     console.error("Error adding word to topic:", error);
  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Assuming `topicId` is available in your component's state or props
  //   // and `wordData` is an object containing the word details from your form
  //   const wordData = {
  //     name: "ExampleWord",
  //     meaning: "Example meaning",
  //     // other word details
  //   };
  //   addWordToTopic(topicId, wordData);
  // };

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <>
      <ListEditWord />
      <hr className="mb-6" />
      <p className="text-left mb-3 font-bold">Add new words</p>
      <Form
        form={form}
        name="add-woed-form"
        layout="inline"
        // onFinish={handleSubmit}
      >
        <Form.Item
          name="word"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Word..."
          />
        </Form.Item>
        <Form.Item
          name="meaning"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            // prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Meaning..."
          />
        </Form.Item>
        <Form.Item
          name="phonetic"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Phonetic..."
          />
        </Form.Item>
        <Form.Item
          name="exampleSentences"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Example sentences..."
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              style={{ minWidth: "100px" }}
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Word
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
export default TopicDetail;
