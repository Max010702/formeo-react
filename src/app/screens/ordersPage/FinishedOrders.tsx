import { Box, Button, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import "../../../css/order.css";

interface OrderProduct {
  id: number;
  name: string;
  image: string;
  material: string;
  price: number;
  quantity: number;
}

interface FinishedOrder {
  id: string;
  completedAt: string;
  products: OrderProduct[];
  delivery: number;
}

const finishedOrders: FinishedOrder[] = [
  {
    id: "FRM-2026-0418",
    completedAt: "August 22, 2026",
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
    id: "FRM-2026-0327",
    completedAt: "August 5, 2026",
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

export default function FinishedOrders() {
  return (
    <TabPanel value="3">
      <Box className="finished-orders">
        {finishedOrders.length > 0 ? (
          <Stack className="finished-orders__list">
            {finishedOrders.map((order) => {
              const subtotal = order.products.reduce(
                (total, product) => total + product.price * product.quantity,
                0,
              );

              const total = subtotal + order.delivery;

              return (
                <Box className="finished-order" key={order.id}>
                  <Stack className="finished-order__header">
                    <Stack className="finished-order__identity">
                      <Box className="finished-order__status-icon">
                        <CheckCircleOutlineIcon />
                      </Box>

                      <Box>
                        <Box className="finished-order__eyebrow">
                          Completed order
                        </Box>

                        <Box className="finished-order__number">
                          Order #{order.id}
                        </Box>
                      </Box>
                    </Stack>

                    <Box className="finished-order__date">
                      Delivered on {order.completedAt}
                    </Box>
                  </Stack>

                  <Stack className="finished-order__products">
                    {order.products.map((product) => (
                      <Box className="finished-order__product" key={product.id}>
                        <Box className="finished-order__image-wrapper">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="finished-order__image"
                          />
                        </Box>

                        <Stack className="finished-order__product-info">
                          <Box>
                            <Box className="finished-order__product-name">
                              {product.name}
                            </Box>

                            <Box className="finished-order__material">
                              {product.material}
                            </Box>
                          </Box>

                          <Box className="finished-order__quantity">
                            Quantity: {product.quantity}
                          </Box>
                        </Stack>

                        <Stack className="finished-order__price-info">
                          <Box className="finished-order__unit-price">
                            ${product.price.toLocaleString()} each
                          </Box>

                          <Box className="finished-order__product-total">
                            $
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>

                  <Stack className="finished-order__summary">
                    <Stack className="finished-order__actions">
                      <Button
                        variant="outlined"
                        startIcon={<ReplayOutlinedIcon />}
                        className="finished-order__secondary-button"
                      >
                        Order again
                      </Button>

                      <Button
                        variant="text"
                        startIcon={<LocalShippingOutlinedIcon />}
                        className="finished-order__track-button"
                      >
                        Delivery details
                      </Button>
                    </Stack>

                    <Stack className="finished-order__totals">
                      <Stack className="finished-order__total-row">
                        <span>Products</span>
                        <strong>${subtotal.toLocaleString()}</strong>
                      </Stack>

                      <Stack className="finished-order__total-row">
                        <span>Delivery</span>
                        <strong>${order.delivery.toLocaleString()}</strong>
                      </Stack>

                      <Stack className="finished-order__grand-total">
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
          <Stack className="finished-orders__empty">
            <Box className="finished-orders__empty-icon">
              <CheckCircleOutlineIcon />
            </Box>

            <Box className="finished-orders__empty-title">
              No completed orders
            </Box>

            <Box className="finished-orders__empty-text">
              Furniture orders you have received will appear here.
            </Box>

            <Button
              variant="contained"
              className="finished-orders__shop-button"
            >
              Explore collection
            </Button>
          </Stack>
        )}
      </Box>
    </TabPanel>
  );
}
