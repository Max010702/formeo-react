import { Box, Button, LinearProgress, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import "../../../css/order.css";

export default function ProcessOrders() {
  return (
    <TabPanel value="3">
      <Box className="process-orders">
        {processOrders.length > 0 ? (
          <Stack className="process-orders__list">
            {[1, 2].map((_ele, index) => {
              const subtotal = order.products.reduce(
                (total, product) => total + product.price * product.quantity,
                0,
              );

              const total = subtotal + order.delivery;

              return (
                <Box className="process-order" key={order.id}>
                  <Stack className="process-order__header">
                    <Stack className="process-order__identity">
                      <Box className="process-order__status-icon">
                        <LocalShippingOutlinedIcon />
                      </Box>

                      <Box>
                        <Box className="process-order__eyebrow">
                          Order in progress
                        </Box>

                        <Box className="process-order__number">
                          Order #{order.id}
                        </Box>
                      </Box>
                    </Stack>

                    <Box className="process-order__delivery-date">
                      <span>Estimated delivery</span>
                      <strong>{order.estimatedDelivery}</strong>
                    </Box>
                  </Stack>

                  <Box className="process-order__progress">
                    <Stack className="process-order__progress-heading">
                      <Box>{order.status}</Box>
                      <span>{order.progress}%</span>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={order.progress}
                      className="process-order__progress-bar"
                    />

                    <Stack className="process-order__progress-labels">
                      <span>Confirmed</span>
                      <span>Preparing</span>
                      <span>Delivery</span>
                      <span>Completed</span>
                    </Stack>
                  </Box>

                  <Stack className="process-order__products">
                    {order.products.map((product) => (
                      <Box className="process-order__product" key={product.id}>
                        <Box className="process-order__image-wrapper">
                          <img
                            src={product.image}
                            className="process-order__image"
                            alt={product.name}
                          />
                        </Box>

                        <Stack className="process-order__product-info">
                          <Box>
                            <Box className="process-order__product-name">
                              {product.name}
                            </Box>

                            <Box className="process-order__material">
                              {product.material}
                            </Box>
                          </Box>

                          <Box className="process-order__quantity">
                            Quantity: {product.quantity}
                          </Box>
                        </Stack>

                        <Stack className="process-order__price-info">
                          <Box className="process-order__unit-price">
                            ${product.price.toLocaleString()} each
                          </Box>

                          <Box className="process-order__product-total">
                            $
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>

                  <Stack className="process-order__summary">
                    <Stack className="process-order__delivery-info">
                      <Stack className="process-order__address">
                        <LocationOnOutlinedIcon />

                        <Box>
                          <span>Delivery address</span>
                          <strong>{order.deliveryAddress}</strong>
                        </Box>
                      </Stack>

                      <Stack className="process-order__actions">
                        <Button
                          variant="contained"
                          startIcon={<LocalShippingOutlinedIcon />}
                          className="process-order__track-button"
                        >
                          Track delivery
                        </Button>

                        <Button
                          variant="text"
                          startIcon={<SupportAgentOutlinedIcon />}
                          className="process-order__support-button"
                        >
                          Get help
                        </Button>
                      </Stack>
                    </Stack>

                    <Stack className="process-order__totals">
                      <Stack className="process-order__total-row">
                        <span>Products</span>
                        <strong>${subtotal.toLocaleString()}</strong>
                      </Stack>

                      <Stack className="process-order__total-row">
                        <span>Delivery</span>
                        <strong>${order.delivery.toLocaleString()}</strong>
                      </Stack>

                      <Stack className="process-order__grand-total">
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
          <Stack className="process-orders__empty">
            <Box className="process-orders__empty-icon">
              <Inventory2OutlinedIcon />
            </Box>

            <Box className="process-orders__empty-title">
              No orders in progress
            </Box>

            <Box className="process-orders__empty-text">
              Furniture being prepared or delivered will appear here.
            </Box>

            <Button variant="contained" className="process-orders__shop-button">
              Explore collection
            </Button>
          </Stack>
        )}
      </Box>
    </TabPanel>
  );
}
