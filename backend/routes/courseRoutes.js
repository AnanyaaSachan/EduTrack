const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById, createCourse } = require("../controllers/courseController");

// GET /api/courses
router.get("/", getAllCourses);

// GET /api/courses/:id
router.get("/:id", getCourseById);

// POST /api/courses (for seeding)
router.post("/", createCourse);

module.exports = router;
