import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

import Basket from "./Basket";
import type { CartItem } from "../../lib/types/search";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onOrder: () => void;
}

export default function OtherNavbar({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
  onOrder,
}: OtherNavbarProps) {
  const authMember = null;

  return (
    <header className="other-navbar">
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
              onDeleteAll={onDeleteAll}
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
      </Container>
    </header>
  );
}
