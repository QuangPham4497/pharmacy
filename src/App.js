import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/user/Home";
import ProductListPage from "./pages/user/ProductList";
import ProductDetailPage from "./pages/user/ProductDetail";
import CartPage from "./pages/user/Cart";
import CheckoutPage from "./pages/user/Checkout";
import ProfilePage from "./pages/user/Profile";

import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import CreateProduct from "./pages/admin/CreateProduct";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import { ROUTES } from "./constants/routes";
import { getUserInfoAction } from "./redux/actions";

import ScrollButton from "./components/ScrollButton";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.USER.CART_LIST} element={<CartPage />} />
          <Route path={ROUTES.USER.CHECKOUT_LIST} element={<CheckoutPage />} />
          <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
          <Route
            path={ROUTES.ADMIN.PRODUCT_MANAGEMENT}
            element={<ProductManagement />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<CreateProduct />}
          />
        </Route>

        <Route path={ROUTES.LOGIN} element={<LoginPage />}></Route>
        <Route path={ROUTES.REGISTER} element={<RegisterPage />}></Route>
      </Routes>
      <ScrollButton />
    </div>
  );
}

export default App;
