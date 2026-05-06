const mongoose = require("mongoose");

let mongoAvailable = false;

const tryConnect = async (uri) => {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
};

const connectDB = async () => {
  mongoAvailable = false;
  const atlasUri = process.env.MONGO_URI;
  const localUri = process.env.MONGO_URI_LOCAL || "mongodb://127.0.0.1:27017/edutrack";

  if (!atlasUri) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "MONGO_URI is not set — attempting local MongoDB at:",
        localUri
      );
    } else {
      console.warn(
        "MONGO_URI is not set — course API will use static data until MongoDB is configured."
      );
      return;
    }
  }

  if (atlasUri) {
    try {
      await tryConnect(atlasUri);
      mongoAvailable = true;
      console.log("MongoDB Connected ✅");
      return;
    } catch (error) {
      console.error("Primary DB Error:", error.message);
      if (process.env.MONGO_URI_LOCAL || process.env.NODE_ENV !== "production") {
        console.warn("Falling back to local MongoDB...");
      }
    }
  }

  if (process.env.MONGO_URI_LOCAL || process.env.NODE_ENV !== "production") {
    try {
      await tryConnect(localUri);
      mongoAvailable = true;
      console.log("Local MongoDB Connected ✅");
      return;
    } catch (error) {
      console.error("Fallback DB Error:", error.message);
    }
  }

  console.warn(
    "MongoDB unavailable — server still runs; /api/courses & login use fallbacks; enrollments need a working database."
  );
};

connectDB.isMongoAvailable = () => mongoAvailable;
module.exports = connectDB;
