const { User, Order, Role } = require("../db");

const getUser = async (prop, value) => {
  const user = await User.findOne({
    where: {
      [prop]: value,
    },
    include: [
      {
        model: Order,
        attributes: ["value"],
      },
      {
        model: Role,
        attributes: ["id", "name"],
      },
    ],
  });
  if (!user) return null;
  return user.dataValues;
};

module.exports = {
  getUser,
};
