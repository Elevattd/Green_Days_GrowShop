const { Op } = require("sequelize");
const { Product, ProductType, Provider } = require("../db");

const getProducts = async () => {
  let options = {
    include: { model: ProductType },
  };
  try {
    let products = Product.findAll(options);
    return products;
  } catch (error) {
    return error;
  }
};

const getProduct = async (id) => {
  let options = {
    include: [{ model: ProductType }, { model: Provider }],
    attributes: ["id", "name", "stock", "description", "price"],
  };
  let product = Product.findOne({ where: { id: id } }, options);
  return product;
};

const getProductsFilter = async (query) => {
  try {
    let options = {
      include: [{ model: ProductType }, { model: Provider }],
      attributes: ["id", "name", "stock", "description", "price", "image"],
    };

    if (query.type) {
      options.include.push({
        model: ProductType,
        where: { id: query.type },
      });
    }

    if (query.provider) {
      options.include.push({
        model: Provider,
        where: { id: query.provider },
      });
    }

    if (query.price) {
      options.order = [["price", query.price]];
    }

    const product = await Product.findAll(options);
    return product;
  } catch (error) {
    return error;
  }
};

const postProduct = async (body) => {
  const { name, stock, description, price, image, type, provider } = body;
  let product;
  try {
    let productType = await ProductType.findByPk(type);

    !productType
      ? null
      : (product = await Product.create({
          name,
          stock,
          description,
          price,
          image,
          providerId: provider,
        })).addProductType(productType);

    return product;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (body, params) => {
  const { name, stock, description, price, image, provider } = body;
  const { id } = params;
  let productUpdate;
  try {
    const product = await Product.findByPk(id);

    !product
      ? null
      : (productUpdate = await product.update({
          name,
          stock,
          description,
          price,
          image,
          provider,
        }));
    return productUpdate;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (params) => {
  let { id } = params;
  let product;
  try {
    !id ? null : (product = await Product.findByPk(id));
    product.destroy();
    return product;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsFilter,
  postProduct,
  updateProduct,
  deleteProduct,
};
