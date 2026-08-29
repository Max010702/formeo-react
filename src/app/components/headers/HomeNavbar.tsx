import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/navbar.css";
import Basket from "./Basket";

export default function HomeNavbar() {
  const authMember = null;

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/" className="brand-link">
              <img
                className="brand-logo"
                src="/icons/burak.svg"
                alt="Furniture logo"
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
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>

            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}

            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}

            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>

            <Basket />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
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
            <Box className="small-title">
              Timeless design · Exceptional comfort
            </Box>

            <Box className="head-main-txt">
              Furniture made for
              <span> inspired living.</span>
            </Box>

            <Box className="welcome-txt">
              Transform your home with beautifully crafted furniture designed to
              bring warmth, comfort, and character into every room.
            </Box>

            <Box className="service-txt">
              Premium materials · Thoughtful craftsmanship
            </Box>

            <Stack className="hero-actions">
              <Button
                component={NavLink}
                to="/products"
                variant="contained"
                className="shop-button"
              >
                Explore collection
              </Button>

              {!authMember ? (
                <Button
                  component={NavLink}
                  to="/signup"
                  variant="outlined"
                  className="signup-button"
                >
                  Sign up
                </Button>
              ) : null}
            </Stack>
          </Stack>

          <Box className="hero-number">
            <span>01</span>
            <div />
            <span>03</span>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
