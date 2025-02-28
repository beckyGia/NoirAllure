import jwt from "jsonwebtoken";

const generateRefreshToken = (userId, rememberMe) => {
  const expirationTime = rememberMe
    ? process.env.REFRESH_TOKEN_LONG_EXPIRATION
    : process.env.REFRESH_TOKEN_SHORT_EXPIRATION;
  //sign creates the token
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: expirationTime,
  });
  return refreshToken;
};

export default generateRefreshToken;
