const jwt = require('jsonwebtoken');
const config = require('./config');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (username) => {

  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '10h' });
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT, generateAccessToken };
