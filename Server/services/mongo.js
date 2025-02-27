const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(); // Uses the default database from MONGO_URI
    console.log("Connected to MongoDB");
  }
  return db;
}

function getDB() {
  if (!db) throw new Error("Database not connected!");
  return db;
}

module.exports = { connectDB, getDB };
