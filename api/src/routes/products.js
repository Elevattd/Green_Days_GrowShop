const { Router } = require("express");
const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", getProducts);
router.post("/", authMiddleware, adminMiddleware, postProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = { router };
