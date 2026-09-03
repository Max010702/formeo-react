import { useState, type SyntheticEvent } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../lib/config";

import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");
  const { authMember } = useGlobals();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const memberImage = authMember?.memberImage
    ? authMember.memberImage.startsWith("http")
      ? authMember.memberImage
      : `${serverApi}/${authMember.memberImage}`
    : "/icons/default-user.svg";

  return (
    <main className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Order categories"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />

                  <Tab label="PROCESS ORDERS" value="2" />

                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>

            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <Box className="order-user-img">
                <img
                  src={memberImage}
                  className="order-user-avatar"
                  alt={authMember?.memberNick || "User profile"}
                />

                <Box className="order-user-icon-box">
                  <img
                    src="/icons/user-badge.svg"
                    className="order-user-prof-img"
                    alt=""
                  />
                </Box>
              </Box>

              <span className="order-user-name">
                {authMember?.memberNick || "User"}
              </span>

              <span className="order-user-prof">
                {authMember?.memberType || "USER"}
              </span>
            </Box>

            <Box className="liner" />

            <Box className="order-user-address">
              <Box display="flex">
                <LocationOnIcon />
              </Box>

              <Box className="spec-address-txt">
                {authMember?.memberAddress || "No address"}
              </Box>
            </Box>
          </Box>

          <Box className="order-info-box" sx={{ mt: "15px" }}>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card number: **** 4090 2002 7495"
              className="card-input"
              autoComplete="cc-number"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <input
                type="text"
                name="cardPeriod"
                placeholder="MM / YY"
                className="card-half-input"
                autoComplete="cc-exp"
              />

              <input
                type="password"
                name="cardCVV"
                placeholder="CVV"
                className="card-half-input"
                autoComplete="cc-csc"
                maxLength={4}
              />
            </Box>

            <input
              type="text"
              name="cardCreator"
              placeholder="Cardholder name"
              className="card-input"
              autoComplete="cc-name"
            />

            <Box className="cards-box">
              <img src="/icons/western-card.svg" alt="Western Union" />

              <img src="/icons/master-card.svg" alt="Mastercard" />

              <img src="/icons/paypal-card.svg" alt="PayPal" />

              <img src="/icons/visa-card.svg" alt="Visa" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </main>
  );
}
