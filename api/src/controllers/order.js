const utils = require("../utils/order");

const createOrder = async (req, res, next) => {
  let { user, list } = req.body;

  try {
    Promise.all(list.map((product) => utils.getProduct(product.id)))
      .then(
        (data) =>
          (data = data.map((item, id) => {
            const stock = item.getDatavalue("stock");
            if (stock === 0)
              throw { status: 400, error: "No stock from this product" };
            return {
              id: item.getDatavalue("id"),
              title: item.getDatavalue("name"),
              currency_id: "ARS",
              picture_url: item.getDatavalue("image"),
              description:
                item.getDataValue("description").slice(0, 250) + "...",
              category_id: "art",
              quantity: list[i].quantity,
              unit_price: item.getDataValue("price"),
            };
          })),
        utils.createPreference(data, user).then((preference) => {
          utils.createOrder(preference.body.id, data, user);
          res.status(200).send(preference.body.sandbox_init_point);
        })
      )
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};
