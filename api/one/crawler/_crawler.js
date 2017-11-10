'use strict';

const request = require('request-promise');
const cheerio = require('cheerio');

class Crawler {
  constructor(url) {
    this.url = url;
    let type = url.match(/article|question/);
    this.type = (type && type[0]) || 'home';
  }

  get() {
    let options = {
      url: this.url,
      transform: function(body) {
        return cheerio.load(body, {decodeEntities: false});
      }
    };

    return request(options);
  }
}

module.exports = Crawler;
