const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("role", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }),
    { timestamps: false };
};
