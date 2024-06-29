import "./App.css";
import { AuthContext } from "./components/auth-component/AuthProvider";
import { useContext, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/auth-component/sign-in/SignIn";
import SignUp from "./components/auth-component/sign-up/SignUp";
import UserDashboard from "./components/user/Dashboard/Dashboard";
import AdminDashboard from "./components/admin/Dashboard/Dashboard";
import UserLayout from "./components/shared/layouts/UserLayout";
import Home from "./components/user/Home/Home";
import Handbook from "./components/user/Handbook/Handbook";
import Dictionary from "./components/user/Dictionary/Dictionary";
import Review from "./components/user/Review/Review";
import CreateCourse from "./components/user/CreateCourse/CreateCourse";
import CourseDetail from "./components/user/CreateCourse/CourseDetail/CourseDetail";
import TopicDetail from "./components/user/CreateCourse/TopicDetail/TopicDetail";

function App() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/dashboard");
    }
  }, [auth.isAuth, navigate]);

  return (
    <Routes>
      {/* Auth route */}
      {/* swap sign-in and user */}
      <Route path="/" element={auth.isAuth ? <UserLayout /> : <SignIn />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* User route */}
      <Route path="/user" element={<UserDashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="handbook" element={<Handbook />} />
        <Route path="dictionary" element={<Dictionary />} />
        <Route path="review" element={<Review />} />
        {auth.role === "teacher" && (
          <Route path="create-course" element={<CreateCourse />} />
        )}
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="courses/:courseId/:topicId" element={<TopicDetail />} />

        {/* <Route path="profile" element={<Handbook />} />
        <Route path="settings" element={<Home />} />
        <Route path="logout" element={<Handbook />} /> */}
      </Route>

      {/* Admin route */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route
        path="/dashboard"
        element={
          auth.isAuth ? (
            auth.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          ) : (
            <SignIn />
          )
        }
      />
    </Routes>
  );
}

export default App;
