'use strict';

const Crawler = require('./_crawler');

class Home extends Crawler {
  get() {
    return super.get()
      .then($ => {
        let json = {};
        let $vol = $('.one-titulo');
        let $ul = $('.pasado');

        json.article = {
          list: parseList($ul.eq(0).find('li'), 'article'),
          one: {
            vol: $vol.eq(0).text().trim(),
            url: $('.one-articulo-titulo a').attr('href'),
            title: $('.one-articulo-titulo a').contents()[0].data.trim(),
            author: $('.one-articulo-titulo small').text().trim().substring(2)
          }
        };
        let articleOne = json.article.one;
        articleOne.id = getId(articleOne.url);

        json.question = {
          list: parseList($ul.eq(1).find('li'), 'question'),
          one: {
            vol: $vol.eq(1).text().trim(),
            url: $('.one-cuestion-titulo a').attr('href'),
            title: $('.one-cuestion-titulo').text().trim()
          }
        };
        let questionOne = json.question.one;
        questionOne.id = getId(questionOne.url);

        json.slide = parseCarousel($);
        return json;
      });
  }
}

function parseList($list, type) {
  let list = [];
  let len = $list.length;
  for (let i = 0; i < len; i++) {
    let o = {};
    let $li = $list.eq(i);
    let $a = $li.find('a');
    o.vol = $li.find('.text-muted').text().trim();
    o.url = $a.attr('href');
    o.id = getId(o.url);

    if (type === 'article') {
      o.author = $li.find('small').text().trim().substring(2);
      o.title = $a.contents()[0].data.trim();
    } else {
      o.title = $a.text().trim();
    }
    list.push(o);
  }

  return list;
}

function parseCarousel($) {
  let $list = $('.carousel-inner .item');
  let list = [];
  for (let i = 0; i < $list.length; i++) {
    let $item = $list.eq(i);
    let $a = $item.find('a').eq(1);
    let o = {};
    o.url = $a.attr('href');
    o.content = $a.text().trim();
    o.img = $item.find('img').attr('src');
    o.id = getId(o.url);
    o.author = $item.find('.fp-one-imagen-footer').text().trim().slice(0, -3);
    o.vol = $item.find('.titulo').text().trim();
    o.day = $item.find('.dom').text().trim();
    o.month = $item.find('.may').text().trim();
    list.push(o);
  }
  return list;
}

function getId(url) {
  let match = url.match(/\/([0-9]+)$/) || [];
  return Number(match[1]) || 0;
}

module.exports = Home;
