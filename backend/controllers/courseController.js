const Course = require("../models/Course");
const connectDB = require("../config/db");
const staticCourses = require("../data/staticCourses");

// GET /api/courses — get all courses
const getAllCourses = async (req, res) => {
  try {
    if (connectDB.isMongoAvailable()) {
      const courses = await Course.find();
      if (courses.length > 0) {
        return res.status(200).json(courses);
      }
    }
    return res.status(200).json(staticCourses);
  } catch (error) {
    return res.status(200).json(staticCourses);
  }
};

// GET /api/courses/:id — get single course
const getCourseById = async (req, res) => {
  const id = String(req.params.id);
  try {
    if (connectDB.isMongoAvailable()) {
      const course = await Course.findById(id);
      if (course) {
        return res.status(200).json(course);
      }
    }
    const fallback = staticCourses.find((c) => String(c._id) === id);
    if (!fallback) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(fallback);
  } catch (error) {
    const fallback = staticCourses.find((c) => String(c._id) === id);
    if (!fallback) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(fallback);
  }
};

// POST /api/courses — create course (seed)
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse };
