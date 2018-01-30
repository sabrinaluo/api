'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('../../models');
const utils = require('../../utils');

const needLogin = require('../../middlewares/auth').needLogin;

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.route('/login').post((req, res, next) => {
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user && user.password === utils.auth.encryptPass(req.body.password)) {
      const token = jwt.sign({
        username: user.username
      }, jwtSecret, {
        expiresIn: '7d'
      });

      res.json({
        token
      });
    } else {
      res.status(401).json({
        error: 'password does not match'
      });
    }
  }).catch(e => {
    next(e);
  });
});

router.route('/signup').post((req, res, next) => {
  const username = req.body.username;
  const password = utils.auth.encryptPass(req.body.password);

  models.User.findOrCreate({
    where: {username},
    defaults: {
      password
    }
  }).spread((user, created) => {
    if (created) {
      const token = utils.auth.jwtSign({username});
      res.json({token});
    } else {
      res.status(403).json({
        error: 'user already exists'
      });
    }
  }).catch(e => {
    // when sending the same request too fast, it will return error
    // todo: findout why it returns error
    next(e);
  });
});

router.route('/test').get(needLogin, (req, res) => {
  console.log(req.user);

  res.send('hi');
});

module.exports = router;
