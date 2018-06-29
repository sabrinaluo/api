'use strict';

const axios = require('axios');
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
      transformResponse: function(data) {
        return cheerio.load(data, {decodeEntities: false});
      }
    };

    return axios(options);
  }
}

module.exports = Crawler;
