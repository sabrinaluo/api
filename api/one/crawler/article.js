'use strict';

const Crawler = require('./_crawler');

class Article extends Crawler {
  get() {
    return super.get()
      .then(response => {
        const $ = response.data;
        const json = {};
        const map = {
          quote: '.comilla-cerrar',
          title: '.articulo-titulo',
          author: '.articulo-autor',
          editor: '.articulo-editor'
        };

        Object.keys(map).forEach(key => {
          const selector = map[key];
          json[key] = $(selector).text().trim();
        });
        json.content = $('.articulo-contenido').html().trim();
        return json;
      });
  }
}

module.exports = Article;
