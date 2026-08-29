import React from "react";
import { Badge, Box, Button, IconButton, Menu, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../../../css/navbar.css";

interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialItems: BasketItem[] = [
  {
    id: "chair-01",
    name: "Lounge Chair",
    price: 420,
    quantity: 1,
    image: "/images/hero.png",
  },
];

export default function Basket() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [items, setItems] = React.useState<BasketItem[]>(initialItems);

  const open = Boolean(anchorEl);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal > 0 ? 25 : 0;
  const total = subtotal + delivery;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const increaseQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <Box className="basket">
      <IconButton
        className="basket__trigger"
        aria-label={`Shopping cart with ${totalQuantity} items`}
        aria-controls={open ? "basket-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge
          badgeContent={totalQuantity}
          invisible={totalQuantity === 0}
          className="basket__badge"
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>

      <Menu
        id="basket-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        PaperProps={{
          className: "basket__paper",
        }}
        MenuListProps={{
          className: "basket__menu-list",
          "aria-labelledby": "basket-button",
        }}
      >
        <Stack className="basket__frame">
          <Stack className="basket__header">
            <Box>
              <Box className="basket__eyebrow">Your selection</Box>
              <Box className="basket__title">Shopping cart</Box>
            </Box>

            <Box className="basket__item-count">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </Box>
          </Stack>

          {items.length === 0 ? (
            <Stack className="basket__empty">
              <Box className="basket__empty-icon">
                <ShoppingCartOutlinedIcon />
              </Box>

              <Box className="basket__empty-title">Your cart is empty</Box>

              <Box className="basket__empty-text">
                Discover timeless furniture for your home.
              </Box>

              <Button
                variant="contained"
                className="basket__continue-button"
                onClick={handleClose}
              >
                Explore collection
              </Button>
            </Stack>
          ) : (
            <>
              <Stack className="basket__items">
                {items.map((item) => (
                  <Box className="basket__item" key={item.id}>
                    <Box className="basket__image-wrapper">
                      <img
                        src={item.image}
                        className="basket__product-image"
                        alt={item.name}
                      />
                    </Box>

                    <Stack className="basket__product-details">
                      <Stack className="basket__product-heading">
                        <Box>
                          <Box className="basket__product-name">
                            {item.name}
                          </Box>

                          <Box className="basket__product-category">
                            Furniture collection
                          </Box>
                        </Box>

                        <IconButton
                          className="basket__remove-item"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.id)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Stack>

                      <Stack className="basket__product-bottom">
                        <Stack className="basket__quantity">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </Stack>

                        <Box className="basket__product-price">
                          ${(item.price * item.quantity).toLocaleString()}
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>

              <Stack className="basket__summary">
                <Stack className="basket__summary-row">
                  <span>Subtotal</span>
                  <strong>${subtotal.toLocaleString()}</strong>
                </Stack>

                <Stack className="basket__summary-row">
                  <span>Delivery</span>
                  <strong>${delivery.toLocaleString()}</strong>
                </Stack>

                <Stack className="basket__summary-total">
                  <span>Total</span>
                  <strong>${total.toLocaleString()}</strong>
                </Stack>

                <Button
                  startIcon={<ShoppingCartOutlinedIcon />}
                  variant="contained"
                  className="basket__checkout-button"
                >
                  Proceed to checkout
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
