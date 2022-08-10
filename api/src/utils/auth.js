const { User } = require("../db");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

const updateRefreshToken = async (user, errase = false) => {
  let token;
  errase
    ? (token = "")
    : (token = jwt.sign(
        {
          UserInfo: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      ));
  await User.update({ refreshToken: token }, { where: { email: user.email } });
  return token;
};

const verifyRefreshToken = async (user) => {
  const token = user.refreshToken;
  let newToken = "";
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    let decodedUserInfo = decoded;
    if (err || user.name !== decodedUserInfo.UserInfo.name)
      newToken = {
        status: 403,
        message: `You don't have access. Token no longer valid`,
      };
    else newToken = generateAccessToken(user);
  });
  return newToken;
};

module.exports = {
  generateAccessToken,
  updateRefreshToken,
  verifyRefreshToken,
};
