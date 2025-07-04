const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, password, role = "user" } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(409).send({ message: "Username already taken" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.send({ message: "Registered" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send({ message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, role: user.role }, "secret");
  res.send({ token });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(
      users.map((user) => ({
        id: user._id,
        username: user.username,
        role: user.role,
      }))
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
