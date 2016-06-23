'use strict';

const nconf = require('nconf');

nconf.argv().env(['NODE_ENV']);

let env = nconf.get('NODE_ENV') || 'develop';
let port = nconf.get('PORT') || env === 'develop' ? 3000 : 8080;

nconf.set('PORT', port);

module.exports = nconf;
