const path = require('path');
const fs = require('fs');

const appDir = process.cwd();
const dotenvPath = path.resolve(appDir, '.env');

const NODE_ENV = process.env.NODE_ENV || 'develop';

// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/env.js#L26
const dotenvFiles = [
  `${dotenvPath}.${NODE_ENV}.local`,
  `${dotenvPath}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${dotenvPath}.local`,
  dotenvPath
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile
    });
  }
});
