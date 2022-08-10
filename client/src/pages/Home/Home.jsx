import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "../../components/Login/Login";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const currentToken = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";
  const tokenAbbr = `${currentToken?.slice(0, 9)}...`;

  const content = !currentToken ? (
    <div>
      <Login />
    </div>
  ) : (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <Link to="/grid">Grid</Link>
    </section>
  );

  return <div>{content}</div>;
};

export default Home;
