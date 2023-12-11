import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/LoginPage";
import Registerpage from "./Pages/RegisterPage";
import { useSelector } from "react-redux";
import Spinner from "./Components/Spinner";
import ProtectedRoute from "./Components/ProtectesRoute";
import PublicRoute from "./Components/PublicRoute";
import ApplyTeacher from "./Pages/ApplyTeacher";
import NotificationPage from "./Pages/NotificationPage";
import Users from "./Pages/admin/Users";
import Teachers from "./Pages/admin/Teachers";
import Bookingpage from "./Pages/Bookingpage";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <Router>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Loginpage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Registerpage />
                </PublicRoute>
              }
            />
            <Route
              path="/apply-teacher"
              element={
                <ProtectedRoute>
                  <ApplyTeacher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/teacher/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/teacher-postassignments"
              element={
                <ProtectedRoute>
                  <Bookingpage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
