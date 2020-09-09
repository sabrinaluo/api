import * as t from 'io-ts';
import { IntFromString } from 'io-ts-types/lib/IntFromString';
import { regexp } from 'io-ts-types/lib/regexp';

const StringOrRegexp = t.union([t.string, regexp]);

const schema = t.strict({
  PORT: t.union([t.Int, IntFromString]),
  PASS_SALT: t.string,
  JWT_SECRET: t.string,
  DATABASE_URL: t.string,
  REDIS_URL: t.string,
  corsWhitelistOrigin: t.union([StringOrRegexp, t.array(StringOrRegexp)]),
  jwtExpireIn: t.union([t.string, t.Int]),
});

export type Schema = t.TypeOf<typeof schema>;
export default schema;
