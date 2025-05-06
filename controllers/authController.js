const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists or invalid' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const hashed = await bcrypt.hash(newPassword, 10);
        const updated = await User.findOneAndUpdate({ email }, { password: hashed });
        if (!updated) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'Password updated' });
    } catch {
        res.status(500).json({ error: 'Failed to reset password' });
    }
};
