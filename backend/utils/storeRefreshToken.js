import { redis } from "../config/redis.js";

const storeRefreshToken = async (userId, refreshToken, rememberMe) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    rememberMe
      ? process.env.REFRESH_TOKEN_LONG_EXPIRATION_NUMBER * 24 * 60 * 60 * 1000
      : process.env.REFRESH_TOKEN_SHORT_EXPIRATION_NUMBER * 24 * 60 * 60 * 1000
  );
};

export default storeRefreshToken;
