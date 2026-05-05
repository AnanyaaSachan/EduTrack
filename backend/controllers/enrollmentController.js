const Enrollment = require("../models/Enrollment");

// POST /api/enrollments/enroll
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    const alreadyEnrolled = await Enrollment.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(200).json(alreadyEnrolled); // return existing enrollment
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      completedModules: [],
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/enrollments/complete — toggle module completion
exports.completeModule = async (req, res) => {
  try {
    const { userId, courseId, moduleId } = req.body;

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

    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
