import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/usersPage";
import HelpPage from "./screens/helpPage";
import type { CartItem } from "./lib/types/search";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

const getInitialCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("cartData");

    if (!savedCart) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch (error) {
    console.error("Failed to read cart data:", error);
    return [];
  }
};

function App() {
  const location = useLocation();
  const history = useHistory();

  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);

  const onAdd = (input: CartItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item._id === input._id);

      if (existingItem) {
        return currentItems.map((item) =>
          item._id === input._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          ...input,
          quantity: input.quantity || 1,
        },
      ];
    });
  };

  const onRemove = (input: CartItem) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item._id === input._id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const onDelete = (input: CartItem) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== input._id),
    );
  };

  const onOrder = () => {
    if (cartItems.length === 0) {
      return;
    }

    history.push("/orders");
  };

  const navbarProps = {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onOrder,
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar {...navbarProps} />
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
    </>
  );
}

export default App;
