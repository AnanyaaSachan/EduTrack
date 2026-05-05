import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { fetchUserEnrollments, enrollInCourse, toggleModuleComplete } from './services/api';
import './index.css';

function AppContent() {
  // enrollments: [{ _id, courseId: {...}, completedModules: [...] }]
  const [enrollments, setEnrollments] = useState([]);

  // Derived: list of enrolled course IDs
  const enrolledCourseIds = enrollments.map((e) => e.courseId?._id || e.courseId);

  // Derived: progress map { courseId: [moduleId, ...] }
  const progress = enrollments.reduce((acc, e) => {
    const cId = e.courseId?._id || e.courseId;
    acc[cId] = e.completedModules || [];
    return acc;
  }, {});

  // Load enrollments when user logs in
  const loadEnrollments = async (userId) => {
    try {
      const data = await fetchUserEnrollments(userId);
      setEnrollments(data);
    } catch (err) {
      console.error("Failed to load enrollments:", err);
    }
  };

  // Enroll in a course
  const handleEnroll = async (userId, courseId) => {
    try {
      const enrollment = await enrollInCourse(userId, courseId);
      setEnrollments((prev) => {
        const exists = prev.find((e) => (e.courseId?._id || e.courseId) === courseId);
        if (exists) return prev;
        return [...prev, enrollment];
      });
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  // Toggle module completion
  const handleModuleToggle = async (userId, courseId, moduleId) => {
    try {
      const updated = await toggleModuleComplete(userId, courseId, moduleId);
      setEnrollments((prev) =>
        prev.map((e) =>
          (e.courseId?._id || e.courseId) === courseId
            ? { ...e, completedModules: updated.completedModules }
            : e
        )
      );
    } catch (err) {
      console.error("Module toggle failed:", err);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Home
                enrolledCourses={enrolledCourseIds}
              />
            }
          />
          <Route
            path="/courses/:id"
            element={
              <CourseDetails
                enrolledCourses={enrolledCourseIds}
                progress={progress}
                onEnroll={handleEnroll}
                onModuleToggle={handleModuleToggle}
              />
            }
          />
        </Route>

        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  enrollments={enrollments}
                  progress={progress}
                  onLoadEnrollments={loadEnrollments}
                />
              }
            />
          </Route>
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login onLoadEnrollments={loadEnrollments} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
