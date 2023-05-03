require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, secret);
    const username = decoded.loggedInUser.username;
    req.user = { username };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "You are not authorized to access this page" });
  }
};

module.exports = Authentication;
