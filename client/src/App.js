import { Route, Routes } from "react-router-dom";
import Grid from "./components/Grid/Grid";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { useGetUserAuthQuery } from "./features/auth/authApiSlice";
import Home from "./pages/Home/Home";

function App() {
  useGetUserAuthQuery();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/grid" element={<Grid />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
