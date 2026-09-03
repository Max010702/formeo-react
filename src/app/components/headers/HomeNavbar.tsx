import { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import type { CartItem } from "../../lib/types/search";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onOrder?: () => void;
}

export default function HomeNavbar({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onOrder,
}: HomeNavbarProps) {
  const authMember = null;
  const [serviceHours, setServiceHours] = useState(0);
  const [showSignupMessage, setShowSignupMessage] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setServiceHours((previousHours) => {
        if (previousHours >= 24) {
          window.clearInterval(intervalId);
          return 24;
        }

        return previousHours + 1;
      });
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handleSignup = () => {
    setShowSignupMessage((previousValue) => !previousValue);
  };

  return (
    <header className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className="brand">
            <NavLink to="/" aria-label="Go to home page">
              <img
                className="brand-logo"
                src="/icons/burak.svg"
                alt="Formeo Furniture"
              />
            </NavLink>
          </Box>

          <Stack className="links">
            <Box className="hover-line">
              <NavLink exact to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>

            <Box className="hover-line">
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>

            {authMember && (
              <>
                <Box className="hover-line">
                  <NavLink to="/orders" activeClassName="underline">
                    Orders
                  </NavLink>
                </Box>

                <Box className="hover-line">
                  <NavLink to="/member-page" activeClassName="underline">
                    My Page
                  </NavLink>
                </Box>
              </>
            )}

            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onOrder={onOrder}
            />

            {!authMember ? (
              <Button variant="contained" className="login-button">
                Login
              </Button>
            ) : (
              <img
                className="user-avatar"
                src="/icons/default-user.svg"
                alt="User profile"
                aria-haspopup="true"
              />
            )}
          </Stack>
        </Stack>

        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="hero-eyebrow">Timeless furniture collection</Box>

            <Box component="h1" className="head-main-txt">
              Thoughtful design for modern living
            </Box>

            <Box component="p" className="welcome-txt">
              Discover beautifully crafted furniture designed to make every
              space feel like home.
            </Box>

            <Box className="service-txt">
              Customer service available {serviceHours} hours
            </Box>

            {!authMember && (
              <Box className="signup">
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={handleSignup}
                >
                  Explore Collection
                </Button>

                {showSignupMessage && (
                  <Box className="signup-message">
                    Create an account to save your favorite furniture.
                  </Box>
                )}
              </Box>
            )}
          </Stack>

          <Box className="logo-frame" aria-hidden="true">
            <div className="logo-image" />
          </Box>
        </Stack>
      </Container>
    </header>
  );
}
