const adminMiddleware = (req, res, next) => {
  const { role } = req.body.user;

  role.id === 1010
    ? res.status(403).send("You don`t have access. Token no longer valid")
    : next();
};

module.exports = {
  adminMiddleware,
};
