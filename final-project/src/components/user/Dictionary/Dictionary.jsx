import { Input, message, Card } from "antd";
import { useState } from "react";

const { Search } = Input;

const Dictionary = () => {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (wordNeedtoSearch) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordNeedtoSearch}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResult(data); // Assuming you want to store the result in state
      console.log(data); // Or handle the data as needed
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Failed to fetch dictionary data.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-left font-bold text-lg">Dictionary</h1>
      </div>

      <Search
        className="mr-4 mt-0.5"
        placeholder="Search word"
        onSearch={handleSearch}
        enterButton
        style={{
          width: 400,
        }}
      />
      {searchResult && (
        <Card title={searchResult[0].word}>
          <p>
            License:{" "}
            <a href={searchResult[0].license.url}>
              {searchResult[0].license.name}
            </a>
          </p>
          <p>Meanings: {searchResult[0].meanings.length}</p>
          <p>
            Phonetics:{" "}
            {searchResult[0].phonetics
              .map((phonetic) => phonetic.text)
              .join(", ")}
          </p>
          <p>
            Source URLs:{" "}
            {searchResult[0].sourceUrls.map((url) => (
              <a href={url} key={url}>
                {url}
              </a>
            ))}
          </p>
        </Card>
      )}
    </>
  );
};

export default Dictionary;
