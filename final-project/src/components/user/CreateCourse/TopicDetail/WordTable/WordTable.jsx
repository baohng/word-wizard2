import { Table } from "antd";
const columns = [
  {
    title: "Word",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Meaning",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Example sentences",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phonetic",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        size="small"
      >
        Update
      </button>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        size="small"
      >
        Delete
      </button>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const WordTable = () => <Table columns={columns} dataSource={data} />;
export default WordTable;
