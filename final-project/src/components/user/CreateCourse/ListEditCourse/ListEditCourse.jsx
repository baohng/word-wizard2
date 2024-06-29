/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";

// const count = 5;
const ListEditCourse = ({ searchQuery }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
        setInitLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCourses();
  }, []);

  // const onLoadMore = () => {

  //   setLoading(true);
  //   setCourses(
  //     courses.concat(
  //       [...new Array(count)].map(() => ({
  //         loading: true,
  //         name: "", // Use an empty string or placeholder text
  //         picture: "", // Use an empty string or placeholder URL
  //       }))
  //     )
  //   );
  //   fetch("http://localhost:8080/api/courses/")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const newData = courses.concat(res.results);
  //       setCourses(newData);
  //       setLoading(false);
  //       window.dispatchEvent(new Event("resize"));
  //     });
  // };
  // const loadMore =
  //   !initLoading && !loading ? (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         marginTop: 12,
  //         height: 32,
  //         lineHeight: "32px",
  //       }}
  //     >
  //       <Button onClick={onLoadMore}>loading more</Button>
  //     </div>
  //   ) : null;

  useEffect(() => {
    // Call filterCourses only if searchQuery is not empty
    if (searchQuery) {
      filterCourses(searchQuery);
    } else {
      // If searchQuery is empty, reset filteredCourses to all courses
      setFilteredCourses(courses);
    }
  }, [searchQuery, courses]); // Depend on searchQuery and courses

  const filterCourses = (searchQuery) => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  console.log("courses: ", courses);
  return (
    <>
      <List
        className="demo-loadmore-list text-left"
        loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={searchQuery ? filteredCourses : courses}
        renderItem={(course) => (
          <List.Item
            key={course.id}
            actions={[
              <Link
                to={`http://localhost:5173/user/courses/${course.id}`}
                key="list-loadmore-edit"
              >
                edit
              </Link>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    course.picture
                      ? course.picture.large
                      : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`
                  }
                />
              }
              title={
                <Link to={`http://localhost:5173/user/courses/${course.id}`}>
                  {course.name}
                </Link>
              }
              description={course.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default ListEditCourse;
