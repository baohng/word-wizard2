import { Flex, Progress } from "antd";
const LearnProgressBar = () => (
  <Flex gap="small" vertical>
    <Progress percent={30} />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </Flex>
);
export default LearnProgressBar;
