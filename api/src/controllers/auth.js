const { User } = require("../db");
const { getUser } = require("../utils/user");
const {
  generateAccessToken,
  updateRefreshToken,
  verifyRefreshToken,
} = require("../utils/auth");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  let user;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    user = {
      name: req.body.name,
      email: req.body.email,
      dni: req.body.dni,
      birthday: req.body.birthday,
      password,
      roleId: req.body.role ? req.body.role : 1010,
    };
    const userExists = await getUser("email", user.email);
    userExists
      ? res.status(400).send({ error: `User already exists` })
      : await User.create(user);

    res.status(201).send({ msg: "Created" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  let user;
  try {
    user = await getUser("email", req.body.email);
    if (!user) return res.status(404).send({ error: `User not found` });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).send({ error: `Password incorrect` });
    const accessToken = generateAccessToken(user);
    const refreshToken = await updateRefreshToken(user);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        role: user.role,
        orders: user.orders,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies) return res.status(401).send({ error: `Unauthorized` });
  const refreshToken = cookies.jwt;

  try {
    const user = await getUser("refreshToken", refreshToken);

    if (!user) return res.status(401).send({ error: `Forbiden` });
    let newToken = await verifyRefreshToken(user);

    if (typeof newToken === "string") res.send({ accesToken: newToken });
    else throw newToken; // obj error {status, message}
    // else res.status(newToken.status).send(newToken.message);
  } catch (error) {
    next(error);
  }
};

const handleUserSession = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).send({ error: `Unauthorized` });
  const refreshToken = cookies.jwt;
  try {
    const user = await getUser("refreshToken", refreshToken);
    if (!user) return next({ status: 404, message: "Session Inactive" });
    let newToken = await verifyRefreshToken(user);
    if (typeof newToken === "string") {
      return res.send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          role: user.role,
          orders: user.orders,
        },
        accessToken: newToken,
      });
    } else res.status(newToken.status).send(newToken.message);
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);
  if (!cookies.jwt)
    return res.status(401).send({ error: `No token found, unauthorized` });
  const refreshToken = cookies.jwt;
  try {
    const user = await getUser("refreshToken", refreshToken);
    if (!user) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }
    console.log("user", user);
    await updateRefreshToken(user, true);
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  handleRefreshToken,
  handleUserSession,
  logOut,
};
