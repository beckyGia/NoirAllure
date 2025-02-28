const setAccessCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: process.env.ACCESS_TOKEN_EXPIRATION_NUMBER * 60 * 1000, // 15 minutes
  });
};

const setRefreshCookie = (res, refreshToken, rememberMe) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: rememberMe
      ? process.env.REFRESH_TOKEN_LONG_EXPIRATION_NUMBER * 24 * 60 * 60 * 1000
      : process.env.REFRESH_TOKEN_SHORT_EXPIRATION_NUMBER * 24 * 60 * 60 * 1000,
  });
};

export { setAccessCookie, setRefreshCookie };
