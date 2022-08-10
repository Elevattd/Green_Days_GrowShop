const mercadopago = require("mercadopago");

const createPreference = (data, user) => {
  mercadopago.configure({
    access_token: config.ACCESS_TOKEN,
  });

  const preference = mercadopago.preferences.create({
    payer: {
      name: user.name,
      surname: user.surname || "",
      email: user.email || "test@userTest.com",
      identification: {
        type: "DNI",
        number: user.DNI || "12345678",
      },
    },
    data,
    back_urls: {
      success: `${config.API_HOST}/api/process-payment/update`,
      failure: `${config.API_HOST}/api/process-payment/update`,
      pending: `${config.API_HOST}/api/process-payment/update`,
    },
  });
  return preference;
};

module.exports = { createPreference };
