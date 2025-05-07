const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed });
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
};

exports.reset = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const updated = await User.findOneAndUpdate(
      { email },
      { password: hashed }
    );
    if (!updated) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "Password updated" });
  } catch (err) {
    res.status(500).json({ msg: "Reset error" });
  }
};
