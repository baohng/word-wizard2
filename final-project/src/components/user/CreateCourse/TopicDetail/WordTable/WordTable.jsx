/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {React.cloneElement(inputNode, {
            id: `${record.id}-${dataIndex}`,
          })}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const WordTable = ({ words }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(words);
  const [editingKey, setEditingKey] = useState("");
  const { topicId } = useParams();
  useEffect(() => {
    setData(words);
  }, [words]);

  // Function to fetch the latest words from the server
  const fetchLatestWords = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/topics/${topicId}/words`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const latestWords = await response.json();

      setData(latestWords);
    } catch (error) {
      console.error("Error fetching topic details: ", error);
    }
  };

  // Update word function
  const updateWord = async (updatedWord) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/words/${updatedWord.id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWord),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating word: ", error);
    }
  };

  // Delete word function
  const deleteWord = async (wordId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/words/${wordId}/delete`,
        {
          method: "DELETE",
        }
      );

      // Remove the word from the local storage to update the UI
      setData(data.filter((word) => word.id !== wordId));
      await fetchLatestWords();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Error deleting word: ", error);
    }
  };

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      word: "",
      meaning: "",
      exampleSentences: "",
      phonetic: "",
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };

  // function confirm save edited word
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        const updatedWord = await updateWord(updatedItem);
        newData.splice(index, 1, updatedWord);
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Words",
      dataIndex: "word",
      width: "25%",
      editable: true,
    },
    {
      title: "Meaning",
      dataIndex: "meaning",
      width: "15%",
      editable: true,
    },
    {
      title: "Phonetic",
      dataIndex: "phonetic",
      width: "15%",
      editable: true,
    },
    {
      title: "Example Sentences",
      dataIndex: "exampleSentences",
      width: "30%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              className="mr-3"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            |
            <Typography.Link
              className="ml-3"
              disabled={editingKey !== ""}
              onClick={() => deleteWord(record.id)}
            >
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey={(record) => record.id}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default WordTable;
