import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectCurrentAuthFetched,
  selectCurrentToken,
} from "../../features/auth/authSlice";

const Loader = () => {
  const currentToken = useSelector(selectCurrentToken);
  const authFetched = useSelector(selectCurrentAuthFetched);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (currentToken) return navigate(from, { replace: true });
    if (authFetched) return navigate("/", { replace: true });
  }, [currentToken, authFetched, from, navigate]);

  return <h1>Cargando</h1>;
};

export default Loader;
