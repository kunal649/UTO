const bcrypt = require("bcrypt");

async function userSignup(req, res) {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!existingUser) {
    const newUser = new User.create({ username, email, password });
    return res.status(200).json({ message: "User Created" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  // Generate a token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    "JWT_SECRET",
    { expiresIn: "2h" }
  );

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.json({ success: true, user: newUser, token });
}

module.exports = userSignup;