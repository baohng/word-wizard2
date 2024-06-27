import { List } from "antd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const data = [
  {
    title: "enthusiastic",
  },
  {
    title: "entertainer",
  },
  {
    title: "elegance",
  },
  {
    title: "conflict",
  },
];
const App = () => (
  <List
    className="text-left"
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <CheckCircleIcon className="mr-3" />
        <List.Item.Meta
          // avatar={
          //   <Avatar
          //     src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
          //   />
          // }
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
);
export default App;
