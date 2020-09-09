const [_, redisHost, redisPort] = process.env.REDIS_URL?.match(/(.+):(\d+)$/);

export default {
  PORT: process.env.PORT,
  PASS_SALT: process.env.PASS_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_HOST: redisHost,
  REDIS_PORT: redisPort,
};
