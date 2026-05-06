import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Login — save to state + localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout — clear state + localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("pendingEnrollmentCourseId");
  };

  // Set pending enrollment (when user tries to enroll while logged out)
  const setPendingEnrollment = (courseId) => {
    localStorage.setItem("pendingEnrollmentCourseId", courseId);
  };

  // Get and clear pending enrollment
  const getPendingEnrollment = () => {
    const courseId = localStorage.getItem("pendingEnrollmentCourseId");
    if (courseId) {
      localStorage.removeItem("pendingEnrollmentCourseId");
    }
    return courseId;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setPendingEnrollment, getPendingEnrollment }}>
      {children}
    </AuthContext.Provider>
  );
};
