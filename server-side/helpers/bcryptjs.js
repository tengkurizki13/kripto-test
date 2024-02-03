const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

// fucntion for hash password
const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};


// fuction for compare password
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
