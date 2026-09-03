import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";

import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../lib/config";

export default function FinishedOrders() {
  const finishedOrders = useSelector(retrieveFinishedOrders);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.map((order) => (
          <Box key={order._id} className="order-main-box">
            <Box className="order-box-scroll">
              {order.orderItems.map((item) => {
                const product = order.productData.find(
                  (productItem) => productItem._id === item.productId,
                );

                if (!product) {
                  return null;
                }

                const productImage = product.productImages[0];

                const imagePath = productImage
                  ? productImage.startsWith("http")
                    ? productImage
                    : `${serverApi}/${productImage}`
                  : "/icons/noimage-list.svg";

                const itemTotal = item.itemQuantity * item.itemPrice;

                return (
                  <Box key={item._id} className="orders-name-price">
                    <img
                      src={imagePath}
                      className="order-dish-img"
                      alt={product.productName}
                    />

                    <p className="title-dish">{product.productName}</p>

                    <Box className="price-box">
                      <p>${item.itemPrice.toLocaleString()}</p>

                      <img src="/icons/close.svg" alt="Times" />

                      <p>{item.itemQuantity}</p>

                      <img src="/icons/pause.svg" alt="Equals" />

                      <p style={{ marginLeft: "15px" }}>
                        ${itemTotal.toLocaleString()}
                      </p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className="total-price-box">
              <Box className="box-total">
                <p>Product price</p>

                <p>
                  ${(order.orderTotal - order.orderDelivery).toLocaleString()}
                </p>

                <img
                  src="/icons/plus.svg"
                  alt="Plus"
                  style={{ marginLeft: "20px" }}
                />

                <p>Delivery cost</p>

                <p>${order.orderDelivery.toLocaleString()}</p>

                <img
                  src="/icons/pause.svg"
                  alt="Equals"
                  style={{ marginLeft: "20px" }}
                />

                <p>Total</p>

                <p>${order.orderTotal.toLocaleString()}</p>
              </Box>
            </Box>
          </Box>
        ))}

        {finishedOrders.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src="/icons/noimage-list.svg"
              style={{
                width: 300,
                height: 300,
              }}
              alt="No finished orders"
            />

            <Box className="no-data">No finished orders</Box>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
