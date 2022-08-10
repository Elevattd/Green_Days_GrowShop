const { Router } = require("express");
const { process_payment } = require("../controllers/process-payment");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = Router();

router.post("/", authMiddleware, process_payment);
router.get("/update" /*updatePayment*/);

module.exports = { router };
