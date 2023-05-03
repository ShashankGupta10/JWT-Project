require("dotenv").config();
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username && !password) {
      res.status(400).json({ msg: "Please enter your credentials" });
    }
    if (!username) {
      res.status(400).json({ msg: "Please enter a username" });
    }
    if (!password) {
      res.status(400).json({ msg: "Please enter a password" });
    }
    const loggedInUser = await User.findOne({ username: username });
    console.log(loggedInUser);
    if (loggedInUser) {
      if (password == loggedInUser.password) {
        const token = jwt.sign({ loggedInUser }, secret);
        res.status(200).json({ msg: "User Logged In successfully!", token });
      } else {
        res
          .status(400)
          .json({ msg: "Wrong Password! Please enter the correct password" });
      }
    } else {
      res.status(400).json({ msg: "Bad credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

const dashboard = async (req, res) => {
  console.log(req.user);
  try {
    res.status(200).json({
      msg: `Hello ${req.user.username}`,
      secret: `Your secret lucky number is<h4>${Math.floor(
        Math.random() * 100
      )}!!!</h3>Make sure to keep it safe and not give it to anyone. Shushhhhhhhh!!`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  dashboard,
};
