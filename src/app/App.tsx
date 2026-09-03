import { useState, type MouseEvent } from "react";
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
import { useGlobals } from "./hooks/useGlobals";
import MemberService from "./services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "./lib/sweetAlert";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const history = useHistory();

  const { authMember, setAuthMember } = useGlobals();

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  const [signupOpen, setSignupOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

  const handleLogoutClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
  };

  const handleLogoutRequest = async () => {
    try {
      const memberService = new MemberService();

      await memberService.logout();

      setAuthMember(null);
      setAnchorEl(null);
      onDeleteAll();

      await sweetTopSuccessAlert("Logged out successfully", 700);

      history.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      await sweetErrorHandling(error);
    }
  };

  const onOrder = () => {
    if (cartItems.length === 0) return;

    if (!authMember) {
      handleLoginOpen();
      return;
    }

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
    anchorEl,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
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
