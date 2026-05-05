const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  level: String,
  duration: String,
  instructor: String,
  thumbnail: String,
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  modules: [
    {
      title: { type: String, required: true },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
