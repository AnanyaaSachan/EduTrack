const Enrollment = require("../models/Enrollment");
const connectDB = require("../config/db");

// POST /api/enrollments/enroll
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    if (!connectDB.isMongoAvailable()) {
      return res.status(503).json({
        message: "Database unavailable — enrollments require MongoDB.",
      });
    }

    const alreadyEnrolled = await Enrollment.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      const populated = await Enrollment.findById(alreadyEnrolled._id).populate(
        "courseId"
      );
      return res.status(200).json(populated);
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      completedModules: [],
    });

    await enrollment.save();
    const populated = await Enrollment.findById(enrollment._id).populate("courseId");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/enrollments/complete — toggle module completion
exports.completeModule = async (req, res) => {
  try {
    const { userId, courseId, moduleId } = req.body;

    if (!connectDB.isMongoAvailable()) {
      return res.status(503).json({
        message: "Database unavailable — cannot update progress without MongoDB.",
      });
    }

    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled" });
    }

    if (enrollment.completedModules.includes(moduleId)) {
      // Toggle off — remove module
      enrollment.completedModules = enrollment.completedModules.filter(
        (id) => id !== moduleId
      );
    } else {
      // Toggle on — add module
      enrollment.completedModules.push(moduleId);
    }

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/enrollments/:userId — get all enrollments with course data
exports.getUserEnrollments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!connectDB.isMongoAvailable()) {
      return res.json([]);
    }

    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
