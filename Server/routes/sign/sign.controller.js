const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");
require("dotenv").config();

const userSignup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false });

    return res
      .status(201)
      .json({ message: "User Created", user: newUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = userSignup;
