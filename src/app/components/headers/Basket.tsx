import { useState, type MouseEvent } from "react";
import { Badge, Box, Button, IconButton, Menu, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";

import type { CartItem } from "../../lib/types/search";
import type { OrderRequest } from "../../lib/types/order";
import { Messages, serverApi } from "../../lib/config";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
}: BasketProps) {
  const { authMember } = useGlobals();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const itemsPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const shippingCost = itemsPrice > 0 && itemsPrice < 100 ? 5 : 0;

  const totalPrice = itemsPrice + shippingCost;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      if (!authMember) {
        throw new Error(Messages.error2);
      }

      if (cartItems.length === 0) {
        return;
      }

      const orderInput: OrderRequest[] = cartItems.map((item) => ({
        itemQuantity: item.quantity,
        itemPrice: item.price,
        productId: item._id,
      }));

      setLoading(true);

      const orderService = new OrderService();
      await orderService.createOrder(orderInput);

      onDeleteAll();
      handleClose();
      history.push("/orders");
    } catch (error) {
      await sweetErrorHandling(error);
    } finally {
      setLoading(false);
    }
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
          <img src="/icons/shopping-cart.svg" className="basket-icon" alt="" />
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
            {cartItems.length === 0 ? (
              <span>Cart is empty!</span>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <span>Cart Products</span>

                <IconButton
                  size="small"
                  color="primary"
                  aria-label="Delete all cart products"
                  onClick={onDeleteAll}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            )}
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
                          size="small"
                          className="cancel-btn"
                          aria-label={`Delete ${item.name}`}
                          onClick={() => onDelete(item)}
                        >
                          <CancelIcon color="primary" />
                        </IconButton>

                        <img
                          src={imagePath}
                          className="product-img"
                          alt={item.name}
                        />

                        <Box className="basket-product-content">
                          <span className="product-name">{item.name}</span>

                          <p className="product-price">
                            ${item.price.toLocaleString()} × {item.quantity}
                          </p>
                        </Box>

                        <Box className="col-2">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => onRemove(item)}
                          >
                            −
                          </button>

                          <span className="item-quantity">{item.quantity}</span>

                          <button
                            type="button"
                            className="add"
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
                <Box className="basket-total">
                  <span className="price">
                    Total: ${totalPrice.toLocaleString()}
                  </span>

                  <small>
                    Products: ${itemsPrice.toLocaleString()} + Delivery: $
                    {shippingCost.toLocaleString()}
                  </small>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  disabled={loading}
                  onClick={() => void proceedOrderHandler()}
                >
                  {loading ? "Processing..." : "Order"}
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
