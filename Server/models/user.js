const { getDB } = require("../config/db");

class User {
  static async create(userData) {
    const db = getDB();
    return await db.collection("users").insertOne(userData);
  }

  static async findByEmail(email) {
    const db = getDB();
    return await db.collection("users").findOne({ email });
  }
}

module.exports = User;
