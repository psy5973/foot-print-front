import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../pages/user/signup/SignUp";
import Home from "../pages/home/Home";
import Layout from "../common/layout/Layout";

function RouteContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteContainer;
