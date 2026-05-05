const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  completeModule,
  getUserEnrollments,
} = require("../controllers/enrollmentController");

// POST /api/enrollments/enroll
router.post("/enroll", enrollCourse);

// POST /api/enrollments/complete
router.post("/complete", completeModule);

// GET /api/enrollments/:userId
router.get("/:userId", getUserEnrollments);

module.exports = router;
