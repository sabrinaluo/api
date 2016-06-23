'use strict';

module.exports = function(err, req, res, next) {
  if (err) {
    res.status(err.statusCode || 500).json({message: err.message});
  } else {
    next();
  }
};
