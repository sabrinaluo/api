const crypto = require('crypto');
const salt = process.env.PASS_SALT || 'secret'; // todo: generate different salt for different user and store in DB can make it more secure
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const encryptPass = function(pass) {
  const md5 = crypto.createHash('md5');
  md5.update(pass + salt);
  return md5.digest('hex');
};

const jwtSign = function(payload, secret = jwtSecret, options = {}) {
  options.expiresIn = options.expiresIn || '7d';
  return jwt.sign(payload, secret, options);
};

module.exports = {encryptPass, jwtSign};
