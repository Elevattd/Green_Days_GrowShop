import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { validateEmail, validatePassword } from "./hooks/useLogin";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setErrMsg] = useState("");
  const [errorsEmail, setErrorsEmail] = useState({});
  const [errorsPassword, setErrorsPassword] = useState({});
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const input = emailRef.current;
    input?.focus();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const userData = await login(credentials).unwrap();
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
    } catch (err) {
      if (!err.data) {
        setErrMsg("The server does not respond");
      } else if (err.originalStatus === 400) {
        setErrMsg("Wrong username or password.");
        // eslint-disable-next-line no-constant-condition
      } else if (err.originalStatus === 401 || 403) {
        setErrMsg("Wrong username or password.");
      } else {
        setErrMsg("Failed to enter");
      }

      const error = errRef.current;
      error?.focus();
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setErrorsEmail(
      validateEmail({ ...email, [e.target.name]: e.target.value })
    );
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setErrorsPassword(
      validatePassword({ ...password, [e.target.name]: e.target.value })
    );
  };

  const content = isLoading ? (
    <h1>Cargando..</h1>
  ) : (
    <div>
      <div className="m-1 ">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            name="email"
            autoComplete="off"
            required={true}
            onChange={handleEmailInput}
          />

          {errorsEmail.email && <p>{errorsEmail.email}</p>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            required={true}
            onChange={handlePasswordInput}
          />

          {errorsPassword.password && <p>{errorsPassword.password}</p>}

          <br />
          <div>
            <button type="submit" disabled={isLoading}>
              Log in
            </button>
          </div>
          <br />
        </form>
        {/* <div >
                  <button
                    
                    onClick={() => setModalShow(true)}
                    disabled={isLoading}
                  >
                    Registrer
                  </button>
                </div> */}
      </div>
    </div>
  );
  return <div>{content}</div>;
};

export default Login;
