const { Order, Product, ProductType, Provider } = require("../db");

const createOrder = async (items, user) => {
  items.forEach(async (item) => {
    const product = await Product.findByPk(item.id);
    let stock = product?.getDataValue("stock");

    stock -= item.quantity;

    product?.update({ stock });
    Order.create({
      status: "processing",
      transaction_amount: item.unit_price * item.quantity,
      quantity: item.quantity,
      userId: user.id,
    });
  });
};

module.exports = { createOrder };
