import { Box, Button, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "../../../css/order.css";

interface PendingProduct {
  id: number;
  name: string;
  image: string;
  material: string;
  price: number;
  quantity: number;
}

interface PendingOrder {
  id: string;
  createdAt: string;
  expiresIn: string;
  delivery: number;
  products: PendingProduct[];
}

const pendingOrders: PendingOrder[] = [
  {
    id: "FRM-2026-0524",
    createdAt: "August 28, 2026",
    expiresIn: "Payment required",
    delivery: 25,
    products: [
      {
        id: 1,
        name: "Cloud Modular Sofa",
        image: "/img/sofa.webp",
        material: "Natural ivory bouclé",
        price: 1890,
        quantity: 1,
      },
      {
        id: 2,
        name: "Nova Coffee Table",
        image: "/img/coffee-table.webp",
        material: "Natural travertine",
        price: 760,
        quantity: 1,
      },
    ],
  },
  {
    id: "FRM-2026-0519",
    createdAt: "August 26, 2026",
    expiresIn: "Awaiting confirmation",
    delivery: 25,
    products: [
      {
        id: 3,
        name: "Cane Lounge Chair",
        image: "/img/lounge-chair.webp",
        material: "Oak and natural cane",
        price: 680,
        quantity: 2,
      },
    ],
  },
];

export default function PausedOrders() {
  return (
    <TabPanel value="3">
      <Box className="pending-orders">
        {pendingOrders.length > 0 ? (
          <Stack className="pending-orders__list">
            {pendingOrders.map((order) => {
              const subtotal = order.products.reduce(
                (total, product) => total + product.price * product.quantity,
                0,
              );

              const total = subtotal + order.delivery;

              return (
                <Box className="pending-order" key={order.id}>
                  <Stack className="pending-order__header">
                    <Stack className="pending-order__identity">
                      <Box className="pending-order__status-icon">
                        <ScheduleOutlinedIcon />
                      </Box>

                      <Box>
                        <Box className="pending-order__eyebrow">
                          Pending order
                        </Box>

                        <Box className="pending-order__number">
                          Order #{order.id}
                        </Box>
                      </Box>
                    </Stack>

                    <Box>
                      <Box className="pending-order__status">
                        {order.expiresIn}
                      </Box>

                      <Box className="pending-order__date">
                        Created {order.createdAt}
                      </Box>
                    </Box>
                  </Stack>

                  <Stack className="pending-order__products">
                    {order.products.map((product) => (
                      <Box className="pending-order__product" key={product.id}>
                        <Box className="pending-order__image-wrapper">
                          <img
                            src={product.image}
                            className="pending-order__image"
                            alt={product.name}
                          />
                        </Box>

                        <Stack className="pending-order__product-info">
                          <Box>
                            <Box className="pending-order__product-name">
                              {product.name}
                            </Box>

                            <Box className="pending-order__material">
                              {product.material}
                            </Box>
                          </Box>

                          <Box className="pending-order__quantity">
                            Quantity: {product.quantity}
                          </Box>
                        </Stack>

                        <Stack className="pending-order__price-info">
                          <Box className="pending-order__unit-price">
                            ${product.price.toLocaleString()} each
                          </Box>

                          <Box className="pending-order__product-total">
                            $
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>

                  <Stack className="pending-order__summary">
                    <Stack className="pending-order__actions">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineIcon />}
                        className="pending-order__cancel"
                      >
                        Cancel order
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<PaymentOutlinedIcon />}
                        className="pending-order__payment"
                      >
                        Continue payment
                      </Button>
                    </Stack>

                    <Stack className="pending-order__totals">
                      <Stack className="pending-order__total-row">
                        <span>Products</span>
                        <strong>${subtotal.toLocaleString()}</strong>
                      </Stack>

                      <Stack className="pending-order__total-row">
                        <span>Delivery</span>
                        <strong>${order.delivery.toLocaleString()}</strong>
                      </Stack>

                      <Stack className="pending-order__grand-total">
                        <span>Total</span>
                        <strong>${total.toLocaleString()}</strong>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Stack className="pending-orders__empty">
            <Box className="pending-orders__empty-icon">
              <ShoppingBagOutlinedIcon />
            </Box>

            <Box className="pending-orders__empty-title">No pending orders</Box>

            <Box className="pending-orders__empty-text">
              Furniture saved for checkout will appear here.
            </Box>

            <Button variant="contained" className="pending-orders__shop-button">
              Explore collection
            </Button>
          </Stack>
        )}
      </Box>
    </TabPanel>
  );
}
