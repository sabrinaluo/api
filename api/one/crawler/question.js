'use strict';

const Crawler = require('./_crawler');

class Question extends Crawler {
  get() {
    return super.get()
      .then($ => {
        let json = {};
        let title = $('h4');
        let content = $('.cuestion-contenido');

        json.question = {
          title: title.eq(0).text().trim(),
          content: content.eq(0).html().trim()
        };
        json.answer = {
          title: title.eq(1).text().trim(),
          content: content.eq(1).html().trim()
        };
        return json;
      });
  }
}

module.exports = Question;
