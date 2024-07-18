const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://aiartshop.com/cdn/shop/files/a-mouse-look-like-cooking-chef-ai-painting-645.webp?v=1707653418",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
