'use strict';

const Crawler = require('./_crawler');

class Question extends Crawler {
  get() {
    return super.get()
      .then(response => {
        const $ = response.data;
        const json = {};
        const title = $('h4');
        const content = $('.cuestion-contenido');

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
