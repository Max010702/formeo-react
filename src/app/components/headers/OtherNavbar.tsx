import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/navbar.css";
import Basket from "./Basket";

export default function OtherNavbar() {
  const authMember = true;

  return (
    <header className="other-navbar">
      <Container className="other-navbar__container">
        <Stack className="other-navbar__menu">
          <Box>
            <NavLink to="/" className="other-navbar__brand-link">
              <img
                className="other-navbar__brand-logo"
                src="/icons/burak.svg"
                alt="Furniture brand"
              />
            </NavLink>
          </Box>

          <Stack className="other-navbar__links">
            <Box className="other-navbar__hover-line">
              <NavLink exact to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>

            <Box className="other-navbar__hover-line">
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>

            {authMember ? (
              <Box className="other-navbar__hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}

            {authMember ? (
              <Box className="other-navbar__hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}

            <Box className="other-navbar__hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>

            <Basket />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="other-navbar__login">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="other-navbar__avatar"
                src="/icons/default-user.svg"
                alt="User profile"
                aria-haspopup="true"
              />
            )}
          </Stack>

          <Button
            className="other-navbar__mobile-menu"
            aria-label="Open navigation menu"
          >
            ☰
          </Button>
        </Stack>
      </Container>
    </header>
  );
}
