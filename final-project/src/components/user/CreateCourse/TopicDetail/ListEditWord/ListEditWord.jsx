import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";

const ListEditTopic = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  return (
    <>
      <p className="text-left mb-3 font-bold">Current words in topic</p>
      <Form
        className="mb-6"
        form={form}
        name="horizontal_login"
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
              htmlType="submit"
              style={{ minWidth: "100px" }}
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update
            </Button>
          )}
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              style={{ minWidth: "100px" }}
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Delete
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default ListEditTopic;
