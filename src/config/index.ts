export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  salt: process.env.PASS_SALT,
  corsWhitelistOrigin: [/https?:\/\/([a-z0-9\-]+\.)?hiitea\.io$/],
});
