const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes");
const { notFound } = require("./middlewares/notFound");
const { handleError } = require("./middlewares/handleError");
const config = require("../config.js");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: config.cors,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "authorization",
    ],
  })
);
app.get("/", (req, res, next) => {
  res.send(`
  <h1>Welcome to TechMarket API</h1>
  <h3>Endpoints</h3>
  <ul>
    <li> /api </li>
    <li> /api/products -> GET </li>
  </ul>
`);
});
app.use("/api", router);

app.use(notFound);
app.use(handleError);

module.exports = app;
