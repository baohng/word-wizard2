import { Row, Col, Card, Spin } from "antd";
// import { useState } from "react"; a
import LearnProgressBar from "../Progress/Progress";
import "../FlashCard/flashcard.styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserTypeWord from "../UserInteract/UserTypeWord";

const FlowUI = () => {
  // const [isFlipped, setIsFlipped] = useState(false);
  const { topicId } = useParams();
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Step 1: Current word index
  const [loading, setLoading] = useState(true);
  const [correctlyTypedWords, setCorrectlyTypedWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/topics/${topicId}/words`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const wordsData = await response.json();
        console.log("words: ", wordsData);
        setWords(wordsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchWords();
    }
  }, [topicId]);

  const handleNextWord = async () => {
    // Step 3: Increment current index to show next word
    if (currentWordIndex < words.length - 1) {
      // Before moving to the next word, send the current word to UserWord
      await sendCurrentWordToUserWord(words[currentWordIndex]);
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      if (correctlyTypedWords.length === words.length) {
        console.log("All words typed correctly!");
        // Perform any action here, like showing a success message or navigating to another page
      }
    }
  };

  const sendCurrentWordToUserWord = async (currentWord) => {
    try {
      const response = await fetch(
        "http://localhost:8080/user/word/add-words",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            word: currentWord.id,
            isLearned: true,
            learnedDate: new Date().toISOString().split("T")[0],
            masteryLevel: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Word sent to UserWord successfully:", result);
    } catch (error) {
      console.error("Error sending word to UserWord:", error);
    }
  };

  const currentWord =
    words && words.length > currentWordIndex ? words[currentWordIndex] : null;

  const handleUserTypeWordInput = (userInput) => {
    console.log("User typed: ", userInput);
    // Compare userInput with the current word's word property
    if (
      currentWord &&
      userInput.trim().toLowerCase() === currentWord.word.trim().toLowerCase()
    ) {
      console.log("Correct!");
      setCorrectlyTypedWords([...correctlyTypedWords, currentWord]);
      handleNextWord();
      // Handle correct input (e.g., show success message, move to next word)
    } else {
      console.log("Incorrect. Try again!");
      // Handle incorrect input (e.g., show error message)
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h1>FlowUI Component</h1>
      <LearnProgressBar />
      <div style={{ marginTop: "100px" }}>
        <Row
          gutter={16}
          justify="center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col span={12}>
            <Card
              className="p-12 m-2 border-2 border-gray-300"
              title={currentWord.word}
              bordered={false}
            >
              {currentWord.exampleSentences}
              <p>{currentWord.phonetic}</p>
              <p>{currentWord.meaning}</p>
            </Card>
            <UserTypeWord
              onSubmit={handleUserTypeWordInput}
              currentWord={currentWord ? currentWord : ""}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleNextWord}
            >
              Next word
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FlowUI;
