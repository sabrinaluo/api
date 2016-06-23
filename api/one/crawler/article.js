'use strict';

const Crawler = require('./_crawler');

class Article extends Crawler {
  get() {
    return super.get()
      .then($ => {
        let json = {};
        let map = {
          quote: '.comilla-cerrar',
          title: '.articulo-titulo',
          author: '.articulo-autor',
          editor: '.articulo-editor'
        };

        Object.keys(map).forEach(key => {
          let selector = map[key];
          json[key] = $(selector).text().trim();
        });

        json.content = $('.articulo-contenido').html().trim();
        return json;
      });
  }
}

module.exports = Article;
