import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/navbar.css";

interface HomeNavbarProps {
  authMember?: {
    name?: string;
    avatar?: string;
  } | null;
}

const navigation = [
  { label: "Home", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Help", path: "/help" },
];

export function HomeNavbar({ authMember = null }: HomeNavbarProps) {
  return (
    <Box component="header" className="home-navbar">
      <Container maxWidth="xl" className="home-navbar__container">
        <Stack
          component="nav"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="home-navbar__navigation"
        >
          <NavLink to="/" className="home-navbar__logo-link">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box className="home-navbar__logo-icon">
                <Typography component="span">F</Typography>
              </Box>

              <Box>
                <Typography className="home-navbar__logo-title">
                  FORMA
                </Typography>

                <Typography className="home-navbar__logo-subtitle">
                  FINE FURNITURE
                </Typography>
              </Box>
            </Stack>
          </NavLink>

          <Stack
            direction="row"
            alignItems="center"
            className="home-navbar__links"
          >
            {navigation.map((item) => (
              <NavLink
                exact={item.path === "/"}
                key={item.path}
                to={item.path}
                activeClassName="active"
                className="home-navbar__link"
              >
                {item.label}
              </NavLink>
            ))}

            {authMember && (
              <>
                <NavLink
                  to="/products"
                  activeClassName="active"
                  className="home-navbar__link"
                >
                  Products
                </NavLink>

                <NavLink
                  to="/member-page"
                  activeClassName="active"
                  className="home-navbar__link"
                >
                  My Page
                </NavLink>
              </>
            )}

            <Button
              component={NavLink}
              to={authMember ? "/member-page" : "/login"}
              variant="outlined"
              className="home-navbar__login-button"
            >
              {authMember ? authMember.name || "Account" : "Sign in"}
            </Button>
          </Stack>

          <Button
            aria-label="Open navigation menu"
            className="home-navbar__menu-button"
          >
            ☰
          </Button>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="flex-start"
          className="home-navbar__hero"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box className="home-navbar__eyebrow-line" />

            <Typography className="home-navbar__eyebrow">
              Crafted for inspired living
            </Typography>
          </Stack>

          <Typography component="h1" className="home-navbar__heading">
            Timeless furniture,
            <span> thoughtfully made.</span>
          </Typography>

          <Typography className="home-navbar__description">
            Discover refined furniture created with honest materials,
            exceptional craftsmanship, and comfort designed to last.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            className="home-navbar__actions"
          >
            <Button
              component={NavLink}
              to="/products"
              variant="contained"
              className="home-navbar__primary-button"
            >
              Explore collection
            </Button>

            <Button
              component={NavLink}
              to="/help"
              variant="text"
              className="home-navbar__story-button"
            >
              Our story&nbsp; →
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
