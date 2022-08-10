const products = [
  {
    name: "Papelillos x50u",
    stock: 120,
    decription: "Los papelillos mas finos del mercado",
    price: 180,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 1,
    type: 2,
  },
  {
    name: "Maceta soplada x10L",
    stock: 50,
    decription: "Maceta soplada la mejor del mercado",
    price: 300,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 4,
    type: 3,
  },
  {
    name: "Bong DK",
    stock: 3,
    decription: "Bong de vicrio",
    price: 10500,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 4,
    type: 4,
  },
  {
    name: "Pipa ",
    stock: 5,
    decription: "Pipa de madera",
    price: 3600,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 2,
    type: 4,
  },
  {
    name: "Fertilizante de floracion",
    stock: 23,
    decription: "Fertilizante bueno en NPK",
    price: 2323,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 5,
    type: 1,
  },
  {
    name: "fertilizante de vege",
    stock: 44,
    decription: "Tiene todos los nutrientes para tu suelo",
    price: 5600,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 5,
    type: 1,
  },
  {
    name: "Bioestimulante",
    stock: 2,
    decription: "A base de algas",
    price: 600,
    image:
      "https://www.lionrollingcircus.com/img_grandes/20210122041732-25.jpg",
    provider: 4,
    type: 1,
  },
];

const producType = [
  { type: "Fertilizante" },
  { type: "Sustrato" },
  { type: "Maceta" },
  { type: "Bong" },
  { type: "Papelillos" },
  { type: "Pipas" },
  { type: "Filtros" },
  { type: "Luz" },
];

const brand = [
  { name: "TreeMix" },
  { name: "Top Crop" },
  { name: "Kawsai" },
  { name: "Alquimista" },
  { name: "Azteka Nutrients" },
  { name: "Delta9" },
  { name: "MyR" },
];

const role = [
  { name: "Admin", id: 3030 },
  { name: "User", id: 1010 },
];

const { Product, ProductType, Provider, Role } = require("../src/db");

const MockData = async () => {
  Promise.all([
    // Product.bulkCreate(products),
    ProductType.bulkCreate(producType),
    Provider.bulkCreate(brand),
    Role.bulkCreate(role),
  ]);
};

module.exports = { MockData };
