require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Course = require("./models/Course");
const courses = require("./data/coursesCatalog");

const seedDB = async () => {
  await connectDB();
  await Course.deleteMany();
  await Course.insertMany(courses);
  console.log("✅ Database seeded with courses!");
  mongoose.connection.close();
};

seedDB();
