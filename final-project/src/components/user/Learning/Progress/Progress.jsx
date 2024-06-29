/* eslint-disable react/prop-types */
import { Flex, Progress } from "antd";

// Accept currentWordIndex and totalWords as props
const LearnProgressBar = ({ currentWordIndex, totalWords }) => {
  const progressPercent =
    totalWords > 0 ? (currentWordIndex / totalWords) * 100 : 0;

  return (
    <Flex gap="small" vertical>
      <Progress percent={progressPercent} />
    </Flex>
  );
};

export default LearnProgressBar;
