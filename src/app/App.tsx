import { useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import AuthenticationModal from "./components/auth";
import Footer from "./components/footer";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/usersPage";
import HelpPage from "./screens/helpPage";
import useBasket from "./hooks/useBasket";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const history = useHistory();

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  const [signupOpen, setSignupOpen] = useState<boolean>(false);

  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const handleSignupOpen = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  const handleLoginOpen = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const onOrder = () => {
    if (cartItems.length === 0) return;

    history.push("/orders");
  };

  const navbarProps = {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    onOrder,
    handleLoginOpen,
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar {...navbarProps} handleSignupOpen={handleSignupOpen} />
      ) : (
        <OtherNavbar {...navbarProps} />
      )}

      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <UserPage />
        </Route>

        <Route path="/help">
          <HelpPage />
        </Route>

        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}

export default App;
