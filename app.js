'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
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
