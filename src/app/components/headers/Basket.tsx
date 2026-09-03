import React from "react";
import { Badge, Box, Button, IconButton, Menu, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { CartItem } from "../../lib/types/search";
import { serverApi } from "../../lib/config";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onOrder?: () => void;
}

export default function Basket({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onOrder,
}: BasketProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrder = () => {
    onOrder?.();
    handleClose();
  };

  return (
    <Box className="basket">
      <IconButton
        id="basket-button"
        aria-label={`Shopping cart with ${totalQuantity} items`}
        aria-controls={open ? "basket-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge
          badgeContent={totalQuantity}
          color="secondary"
          invisible={totalQuantity === 0}
        >
          <img src="/icons/shopping-cart.svg" alt="" className="basket-icon" />
        </Badge>
      </IconButton>

      <Menu
        id="basket-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basket-button",
          disablePadding: true,
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            overflow: "visible",
            borderRadius: "18px",
            filter: "drop-shadow(0 12px 30px rgba(33, 26, 21, 0.18))",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 18,
              width: 12,
              height: 12,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Stack className="basket-frame">
          <Box className="all-check-box">
            {cartItems.length === 0 ? "Cart is empty!" : "Your Cart"}
          </Box>

          {cartItems.length > 0 && (
            <>
              <Box className="orders-main-wrapper">
                <Stack className="orders-wrapper">
                  {cartItems.map((item) => {
                    const imagePath = item.image.startsWith("http")
                      ? item.image
                      : `${serverApi}/${item.image}`;

                    return (
                      <Box key={item._id} className="basket-info-box">
                        <IconButton
                          className="cancel-btn"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => onDelete(item)}
                        >
                          <CancelIcon />
                        </IconButton>

                        <img
                          src={imagePath}
                          alt={item.name}
                          className="product-img"
                        />

                        <Box className="basket-product-content">
                          <span className="product-name">{item.name}</span>

                          <p className="product-price">
                            ${item.price.toLocaleString()} × {item.quantity}
                          </p>
                        </Box>

                        <Box className="basket-quantity">
                          <button
                            type="button"
                            className="remove"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => onRemove(item)}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            className="add"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => onAdd(item)}
                          >
                            +
                          </button>
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>

              <Box className="basket-order">
                <span className="price">
                  Total: ${totalPrice.toLocaleString()}
                </span>

                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleOrder}
                >
                  Order
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
