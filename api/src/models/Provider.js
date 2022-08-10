const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "provider",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
