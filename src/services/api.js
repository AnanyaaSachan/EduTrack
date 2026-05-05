const BASE_URL = "http://localhost:5000/api";

// ── Auth ──
export const loginUser = async (name, email) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

// ── Courses ──
export const fetchCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};

export const fetchCourseById = async (id) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
};

// ── Enrollments ──
export const enrollInCourse = async (userId, courseId) => {
  const res = await fetch(`${BASE_URL}/enrollments/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId }),
  });
  if (!res.ok) throw new Error("Enrollment failed");
  return res.json();
};

export const toggleModuleComplete = async (userId, courseId, moduleId) => {
  const res = await fetch(`${BASE_URL}/enrollments/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId, moduleId }),
  });
  if (!res.ok) throw new Error("Failed to update module");
  return res.json();
};

export const fetchUserEnrollments = async (userId) => {
  const res = await fetch(`${BASE_URL}/enrollments/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch enrollments");
  return res.json();
};
