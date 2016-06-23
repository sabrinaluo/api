'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const PORT = config.get('PORT');

let app = express();

app.use(bodyParser.json());

// allow cors
app.use(cors());

app.use('/one', require('./api/one'));
app.use('*', require('./api/404'));
app.use(require('./api/500'));

app.listen(PORT, () => {
  console.log('app is listening on port: ', PORT);
});

module.exports = app;
