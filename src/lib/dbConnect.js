const mongoose = require("mongoose");
require("dotenv").config();
// Use your actual MongoDB URI here, with your database name included
const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global cache to prevent multiple connections during hot reloads in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Connect with options recommended by Mongoose docs
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log("MongoDB connected:", mongoose.connection.host);
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error.message);
        throw error; // Rethrow to handle upstream and avoid silent 500
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
