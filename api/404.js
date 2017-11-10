'use strict';

const express = require('express');
const router = express.Router();

// 404
router.route('*')
  .get((req, res, next) => {
    const e = new Error('Not Found');
    e.statusCode = 404;
    next(e);
  });

module.exports = router;
