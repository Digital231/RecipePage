const User = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const {
      username,
      pass1,
      pass2,
      logo = "https://aiartshop.com/cdn/shop/files/a-mouse-look-like-cooking-chef-ai-painting-645.webp?v=1707653418",
    } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(200)
          .json({ status: "error", message: "Username already exists" });
      }

      if (pass1 !== pass2) {
        return res
          .status(400)
          .json({ status: "error", message: "Passwords do not match" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass1, saltRounds);

      const newUser = new User({
        username,
        password: hashedPassword,
        avatar: logo,
      });

      await newUser.save();

      res.json({ status: "success", user: newUser });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
  login: async (req, res) => {
    const { username, pass1 } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({ status: "error", message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(pass1, user.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { username, id: user._id },
          process.env.JWT_SECRET
        );

        res.json({ status: "success", token });
      } else {
        res.json({ status: "error", message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserByUsername: async (req, res) => {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });
      if (user) {
        const userData = {
          username: user.username,
          avatar: user.avatar,
        };
        res.json(userData);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
