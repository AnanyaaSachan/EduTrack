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
import { getData, setData } from './utils/localStorage';
import './index.css';

function AppContent() {
  // ── Course state (separate from auth) ──
  const [enrolledCourses, setEnrolledCourses] = useState(
    getData("enrolledCourses") || []
  );
  const [progress, setProgress] = useState(
    getData("progress") || {}
  );

  // Auto-save to localStorage
  useEffect(() => {
    setData("enrolledCourses", enrolledCourses);
  }, [enrolledCourses]);

  useEffect(() => {
    setData("progress", progress);
  }, [progress]);

  // Enroll handler
  const handleEnroll = (courseId) => {
    setEnrolledCourses((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    );
  };

  // Module toggle handler
  const handleModuleToggle = (courseId, moduleId) => {
    setProgress((prev) => {
      const courseProgress = prev[courseId] || [];
      if (courseProgress.includes(moduleId)) {
        return {
          ...prev,
          [courseId]: courseProgress.filter((id) => id !== moduleId),
        };
      }
      return {
        ...prev,
        [courseId]: [...courseProgress, moduleId],
      };
    });
  };

  return (
    <Router>
      <Routes>
        {/* Public routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home enrolledCourses={enrolledCourses} />} />
          <Route
            path="/courses/:id"
            element={
              <CourseDetails
                enrolledCourses={enrolledCourses}
                progress={progress}
                onEnroll={handleEnroll}
                onModuleToggle={handleModuleToggle}
              />
            }
          />
        </Route>

        {/* Protected routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  enrolledCourses={enrolledCourses}
                  progress={progress}
                />
              }
            />
          </Route>
        </Route>

        {/* Auth routes (no Navbar) */}
        <Route path="/login" element={<Login />} />
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
