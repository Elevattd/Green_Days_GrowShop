const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const config = require("../config.js");

let sequelize = config.production
  ? new Sequelize({
      database: config.DB_NAME,
      dialect: "postgres",
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
    })
  : new Sequelize(
      `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}`,
      {
        logging: false,
        native: false,
      }
    );

const basename = path.basename(__filename);

const modelDefiners = [];

// Require and add all models to modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inject sequelize connection to models
modelDefiners.forEach((model) => model(sequelize));
// Capitalize model's names
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//sequelize.models has every model as property so we destructure them to make relations
const { Order, Product, User, ProductType, Role, Provider } = sequelize.models;

Product.belongsToMany(ProductType, {
  through: "product-type",
  timestamps: false,
});
ProductType.belongsToMany(Product, {
  through: "product-type",
  timestamps: false,
});

Provider.hasMany(Product);
Product.belongsTo(Provider);

Role.hasMany(User);
User.belongsTo(Role);

User.belongsToMany(Order, { through: "user-order" });
Order.belongsToMany(User, { through: "user-order" });

Order.belongsToMany(Product, { through: "order-product" });
Product.belongsToMany(Order, { through: "order-product" });

module.exports = {
  ...sequelize.models,
  Op,
  sequelize,
};
