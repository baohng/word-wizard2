/* eslint-disable react/prop-types */
import { Flex, Input, Typography } from "antd";
import { useState } from "react";
const { Title } = Typography;
const UserTypeWord = ({ onSubmit, currentWord }) => {
  const wordLength = currentWord ? currentWord.word.length : 0;
  const [inputValue, setInputValue] = useState("");

  const onChange = (text) => {
    console.log("onChange:", text);
    setInputValue(text);
    onSubmit(text);
    setInputValue("");
  };

  const sharedProps = {
    onChange,
    value: inputValue,
  };

  return (
    <Flex gap="middle" align="center" vertical>
      <Title level={5}>{currentWord.meaning}</Title>
      <Input.OTP length={wordLength} {...sharedProps} />
    </Flex>
  );
};

export default UserTypeWord;
