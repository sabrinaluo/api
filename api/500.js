'use strict';

module.exports = function(err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({error: err.message});
  } else {
    next();
  }
};
