import { useState } from "react";
import ListEditCourse from "./ListEditCourse/ListEditCourse";
import CreateCourseForm from "./CreateCourseForm/CreateCourseForm";
import { Input } from "antd";

const { Search } = Input;
const CreateCourse = () => {
  // course state
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <h1 className="text-left font-bold text-xl">Create Course</h1>

      <div className="flex justify-end mb-10">
        {!showForm && (
          <Search
            className="mr-4 mt-0.5"
            placeholder="Search course"
            onSearch={handleSearch}
            enterButton
            style={{
              width: 400,
            }}
          />
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Back to all courses" : "Create Course"}
        </button>
      </div>
      {showForm ? (
        <CreateCourseForm onFormSubmit={() => setShowForm(false)} />
      ) : (
        <ListEditCourse searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default CreateCourse;
