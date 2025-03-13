const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require("dotenv").config();

const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
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

      res.status(201).json({ message: "User Created", user: newUser, token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = userSignup;
