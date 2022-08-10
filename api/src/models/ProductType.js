const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "productType",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
