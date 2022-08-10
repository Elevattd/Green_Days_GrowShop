const utils = require("../utils/products");

const getProducts = async (req, res, next) => {
  let product;
  try {
    if (!req.query) {
      product = await utils.getProducts();
    } else product = await utils.getProductsFilter(req.query);
    !product.length
      ? res.status(404).send({ error: "products not found" })
      : res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  try {
    let product = await utils.postProduct(req.body);
    !product ? res.sendStatus(404) : res.status(201).send(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let product = await utils.updateProduct(req.body, req.params);
    !product
      ? res
          .status(402)
          .send({ error: `Product id: ${req.params.id}, update failed` })
      : res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
