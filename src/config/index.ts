import { isLeft } from 'fp-ts/lib/Either';
import * as R from 'ramda';

import schema, { Schema } from './schema';

const loadAppConfig = (env: string) => {
  let appConfig = {};

  try {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    appConfig = require(`./config.${env}`).default;
  } catch (err) {
    console.warn(`config.${env} is not found`);
  }

  return appConfig;
};

type PartialConfig = Partial<Schema>;
const getConfig = (
  appConfig?: PartialConfig,
  envConfig?: PartialConfig,
  defaultConfig?: PartialConfig,
) => {
  if (!(appConfig && envConfig)) {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    require('dotenv').config();
  }

  /* eslint-disable @typescript-eslint/no-var-requires */
  appConfig = appConfig || loadAppConfig(process.env.NODE_ENV);
  envConfig = envConfig || require('./config.env').default;
  defaultConfig = defaultConfig || require('./config.default').default;
  /* eslint-enable @typescript-eslint/no-var-requires */

  // default <- appConfig <- ENV variable (highest priority)
  const encodedConfig = R.pipe(
    R.mergeDeepRight(defaultConfig),
    R.mergeDeepWith(
      // env overrides only when not nil and not empty
      (envValue, configValue) =>
        !R.isNil(envValue) && envValue !== '' ? envValue : configValue,
      envConfig,
    ),
  )(appConfig);

  // Validate config.
  const config = schema.decode(encodedConfig);
  if (isLeft(config)) {
    throw new Error(
      'Config validation errors:-\n' +
        config.left
          .map(
            (err) =>
              'Validation error at ' +
              err.context.map((context) => context.key).join('.'),
          )
          .join('\n'),
    );
  }

  return config.right;
};

export default getConfig;
