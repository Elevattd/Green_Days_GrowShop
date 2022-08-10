const { Router } = require("express");
const { createOrder } = require("../controllers/order");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = Router();
router.post("/", authMiddleware, createOrder);

module.exports = { router };
