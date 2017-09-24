'use strict';

const express = require('express');

const router = express.Router();
const articles = require('./data/articles.json');

router.route('/article/:articleId')
  .get((req, res) => {
    const id = req.params.articleId;
    const data = articles.filter(item => item.id === id)[0];
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({message: 'Not Found'});
    }
  });

router.route('/articles')
  .get((req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const totalPage = articles.length / limit;

    const data = {
      articles: articles.slice(page * limit, (page + 1) * limit),
      nextPage: page < totalPage ? page + 1 : null,
      totalPage: totalPage
    };

    res.json(data);
  });

module.exports = router;
