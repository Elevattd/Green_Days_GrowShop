const app = require("./src/app.js");
const { sequelize } = require("./src/db");
const config = require("./config.js");
const { MockData } = require("./Mock/Data.js");

// sequelize.sync({ force: false }).then(() => {
sequelize.sync({ force: false }).then(() => {
  app.listen(config.port, () => {
    console.log(`LOAD SERVER --> ON: ${config.port}`);

    // MockData();
  });
});