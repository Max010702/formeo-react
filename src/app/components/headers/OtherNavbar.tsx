import type { MouseEvent } from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../lib/config";
import type { CartItem } from "../../lib/types/search";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  handleLoginOpen: () => void;
  handleLogoutClick: (event: MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
  handleLoginOpen,
  handleLogoutClick,
  anchorEl,
  handleCloseLogout,
  handleLogoutRequest,
}: OtherNavbarProps) {
  const { authMember } = useGlobals();

  const memberImage = authMember?.memberImage
    ? authMember.memberImage.startsWith("http")
      ? authMember.memberImage
      : `${serverApi}/${authMember.memberImage}`
    : "/icons/default-user.svg";

  return (
    <header className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className="brand">
            <NavLink exact to="/" aria-label="Go to home page">
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
            />

            {!authMember ? (
              <Button
                variant="contained"
                className="login-button"
                onClick={handleLoginOpen}
              >
                Login
              </Button>
            ) : (
              <Button
                className="avatar-button"
                aria-label="Open account menu"
                aria-haspopup="true"
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={handleLogoutClick}
              >
                <img
                  className="user-avatar"
                  src={memberImage}
                  alt={authMember.memberNick}
                />
              </Button>
            )}

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5,
                  overflow: "visible",
                  borderRadius: "12px",
                  filter: "drop-shadow(0 8px 24px rgba(33, 26, 21, 0.2))",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 18,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: "#7b5638" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}
