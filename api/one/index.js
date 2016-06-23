'use strict';

const express = require('express');
const crawler = require('./crawler');
// const throwjs = require('throw.js');

const router = express.Router();
const root = 'http://wufazhuce.com';

router.route('/')
  .get((req, res, next) => {
    let homeCrawler = new crawler.Home(root);
    homeCrawler
      .get()
      .then(data => {
        res.json(data);
      })
      .catch(e=> {
        next(e);
      });
  });

router.route('/question/:id')
  .get((req, res, next) => {
    let url = root + '/question/' + req.params.id;
    let questionCrawler = new crawler.Question(url);
    questionCrawler
      .get()
      .then(data => {
        res.json(data);
      })
      .catch(e=> {
        next(e);
      });
  });

router.route('/article/:id')
  .get((req, res, next) => {
    let url = root + '/article/' + req.params.id;
    let articleCrawler = new crawler.Question(url);
    articleCrawler
      .get()
      .then(data => {
        res.json(data);
      })
      .catch(e=> {
        next(e)
      });
  });

module.exports = router;
