/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import WordTable from "./WordTable/WordTable";

const TopicDetail = () => {
  const [showWordCollection, setShowWordCollection] = useState(false);
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [words, setWords] = useState([]);

  const { topicId } = useParams();

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/topics/${topicId}/words`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("word: ", data);
        // Set state with fetched topic details
        setWords(data);
        setShowWordCollection(true);
      } catch (error) {
        console.error("Error fetching topic details: ", error);
      }
    };

    if (topicId) {
      fetchTopicDetails();
    }
  }, [topicId]);

  const fetchAndAddWordToTopic = async (topicId, wordData) => {
    try {
      // Step 1: Fetch existing words
      const existingWordsResponse = await fetch(
        `http://localhost:8080/api/topics/${topicId}/words`
      );
      if (!existingWordsResponse.ok) {
        throw new Error(`HTTP error! status: ${existingWordsResponse.status}`);
      }
      const existingWords = await existingWordsResponse.json();

      // Step 2: Check if the word already exists
      const wordExists = existingWords.some(
        (word) => word.word === wordData.word
      );
      if (wordExists) {
        console.log("Word already exists in the database.");
        return; // Stop the function if the word already exists
      }

      // Step 3: Add the new word if it doesn't exist
      const response = await fetch(
        `http://localhost:8080/api/topics/${topicId}/add-word`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wordData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedWord = await response.json();
      console.log("Word added successfully:", addedWord);
      // Optionally, update your UI here to reflect the added word
      setWords((prevWords) => [...prevWords, addedWord]);
    } catch (error) {
      console.error("Error adding word to topic:", error);
    }
  };

  const onFinish = async (values) => {
    // Assuming `topicId` is available in your component's state or props
    // and `wordData` is an object containing the word details from your form
    const wordData = {
      word: values.word,
      meaning: values.meaning,
      exampleSentences: values.exampleSentences,
      phonetic: values.phonetic,
      // other word details
    };
    fetchAndAddWordToTopic(topicId, wordData);
  };

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <>
      <p className="text-left mb-3 font-bold">Add new words</p>
      <Form
        className="ml-0 m-3"
        form={form}
        name="add-word-form"
        layout="inline"
        onFinish={onFinish}
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
          name="exampleSentences"
          rules={[
            {
              required: true,
              message: "Please input your example sentences!",
            },
          ]}
        >
          <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Phonetic..."
          />
        </Form.Item>
        <Form.Item
          name="phonetic"
          rules={[
            {
              required: true,
              message: "Please input phonetic...!",
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
      <hr className="mt-6" />
      {showWordCollection ? (
        <WordTable words={words} />
      ) : (
        <p className="text-left mt-3">No word added yet.</p>
      )}
    </>
  );
};
export default TopicDetail;
