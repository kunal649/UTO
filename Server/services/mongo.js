const { MongoClient } = require("mongodb");

const MONGO_URL = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URL);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("Untaboo");
    console.log("🔥 Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) throw new Error("❌ Database not connected!");
  return db;
};

module.exports = { connectDB, getDB };
