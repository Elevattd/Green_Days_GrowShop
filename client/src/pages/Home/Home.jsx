import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useGetProductsMutation } from "../../features/products/productsApiSlice";
import { selectProducts } from "../../features/products/productsSlice";
const Home = () => {
  const [getProducts] = useGetProductsMutation();
  const products = useSelector(selectProducts);

  console.log("====products", products);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const content = (
    <section>
      <h1>Bienvenido a la mejor tienda de cultivo del país.</h1>
      <br />
      {products &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>$ {product.price}</p>
              <img src={product.image} alt="" width={"180px"} />
            </div>
          );
        })}
    </section>
  );

  return <div>{content}</div>;
};

export default Home;
