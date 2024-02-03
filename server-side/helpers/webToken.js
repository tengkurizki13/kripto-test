const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "rahasia";


// fucntion for encoded data
const encodedJson = (payload) => {
  return jwt.sign(payload, SECRET);
};


// fucntion for decoded data
const decodedJson = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { encodedJson, decodedJson };
