import { Box, Button, LinearProgress, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import moment from "moment";
import "../../../css/order.css";

export default function ProcessOrders() {
  return (
    <TabPanel value="2">
      <Box className="process-orders">
        {[1, 2].length > 0 ? (
          <Stack className="process-orders__list">
            {[1, 2].map((_order, index) => (
              <Box className="process-order" key={index}>
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
                        Order #FRM-2026-0{498 - index}
                      </Box>
                    </Box>
                  </Stack>

                  <Box className="process-order__delivery-date">
                    <span>Estimated delivery</span>

                    <strong>
                      {moment()
                        .add(index + 3, "days")
                        .format("MMMM D, YYYY")}
                    </strong>
                  </Box>
                </Stack>

                <Box className="process-order__progress">
                  <Stack className="process-order__progress-heading">
                    <Box>
                      {index === 0
                        ? "Preparing your furniture"
                        : "Out for delivery"}
                    </Box>

                    <span>{index === 0 ? 45 : 82}%</span>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={index === 0 ? 45 : 82}
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
                  {[1, 2].map((_product, index2) => (
                    <Box className="process-order__product" key={index2}>
                      <Box className="process-order__image-wrapper">
                        <img
                          src={
                            index2 === 0
                              ? "/img/sofa.webp"
                              : "/img/coffee-table.webp"
                          }
                          className="process-order__image"
                          alt={
                            index2 === 0
                              ? "Cloud Modular Sofa"
                              : "Nova Coffee Table"
                          }
                        />
                      </Box>

                      <Stack className="process-order__product-info">
                        <Box>
                          <Box className="process-order__product-name">
                            {index2 === 0
                              ? "Cloud Modular Sofa"
                              : "Nova Coffee Table"}
                          </Box>

                          <Box className="process-order__material">
                            {index2 === 0
                              ? "Natural ivory bouclé"
                              : "Natural travertine"}
                          </Box>
                        </Box>

                        <Box className="process-order__quantity">
                          Quantity: 1
                        </Box>
                      </Stack>

                      <Stack className="process-order__price-info">
                        <Box className="process-order__unit-price">
                          {index2 === 0 ? "$1,890 each" : "$760 each"}
                        </Box>

                        <Box className="process-order__product-total">
                          {index2 === 0 ? "$1,890" : "$760"}
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
                        <strong>Seoul, South Korea</strong>
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
                      <strong>$2,650</strong>
                    </Stack>

                    <Stack className="process-order__total-row">
                      <span>Delivery</span>
                      <strong>$25</strong>
                    </Stack>

                    <Stack className="process-order__grand-total">
                      <span>Total</span>
                      <strong>$2,675</strong>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            ))}
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
