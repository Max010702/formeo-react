import { useState, type SyntheticEvent } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import PausedOrders from "./PausedOrders";
import ProcessOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <main className="orders-page">
      <section className="orders-page__header">
        <Container className="orders-page__container">
          <Box className="orders-page__eyebrow">Your account</Box>

          <Box component="h1" className="orders-page__title">
            Furniture <span>orders</span>
          </Box>

          <Box className="orders-page__description">
            Follow your furniture from confirmation and preparation through to
            delivery and installation.
          </Box>
        </Container>
      </section>

      <Container className="orders-page__container">
        <Box className="orders-page__layout">
          <Box className="orders-page__content">
            <TabContext value={value}>
              <Box className="orders-page__navigation">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Order status"
                  className="orders-page__tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    value="1"
                    icon={<ScheduleOutlinedIcon />}
                    iconPosition="start"
                    label="Pending"
                  />

                  <Tab
                    value="2"
                    icon={<LocalShippingOutlinedIcon />}
                    iconPosition="start"
                    label="In progress"
                  />

                  <Tab
                    value="3"
                    icon={<CheckCircleOutlineIcon />}
                    iconPosition="start"
                    label="Completed"
                  />
                </Tabs>
              </Box>

              <Stack className="orders-page__main-content">
                <PausedOrders />
                <ProcessOrders />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Box>

          <Stack className="orders-page__sidebar">
            <Box className="orders-profile">
              <Stack className="orders-profile__heading">
                <Box className="orders-profile__avatar-wrapper">
                  <img
                    src="/icons/default-user.svg"
                    className="orders-profile__avatar"
                    alt="Martin"
                  />

                  <Box className="orders-profile__status" />
                </Box>

                <Box>
                  <Box className="orders-profile__eyebrow">Member account</Box>
                  <Box className="orders-profile__name">Martin</Box>
                  <Box className="orders-profile__role">Private customer</Box>
                </Box>
              </Stack>

              <Box className="orders-profile__divider" />

              <Stack className="orders-profile__information">
                <Stack className="orders-profile__information-row">
                  <LocationOnOutlinedIcon />

                  <Box>
                    <span>Delivery address</span>
                    <strong>Address has not been added</strong>
                  </Box>

                  <button type="button" aria-label="Edit delivery address">
                    <EditOutlinedIcon />
                  </button>
                </Stack>
              </Stack>
            </Box>

            <Box className="orders-payment">
              <Stack className="orders-payment__heading">
                <Box>
                  <Box className="orders-payment__eyebrow">Payment method</Box>

                  <Box className="orders-payment__title">Saved payment</Box>
                </Box>

                <CreditCardOutlinedIcon />
              </Stack>

              <Box className="orders-payment__card">
                <Stack className="orders-payment__card-top">
                  <span>FORMA</span>
                  <CreditCardOutlinedIcon />
                </Stack>

                <Box className="orders-payment__number">
                  •••• &nbsp;•••• &nbsp;•••• &nbsp;4090
                </Box>

                <Stack className="orders-payment__card-bottom">
                  <Box>
                    <span>Cardholder</span>
                    <strong>Martin Robertson</strong>
                  </Box>

                  <Box>
                    <span>Expires</span>
                    <strong>07/29</strong>
                  </Box>
                </Stack>
              </Box>

              <button type="button" className="orders-payment__change">
                <EditOutlinedIcon />
                Change payment method
              </button>

              <Stack className="orders-payment__security">
                <LockOutlinedIcon />

                <span>
                  Your payment information is encrypted and securely stored.
                </span>
              </Stack>
            </Box>

            <Box className="orders-support">
              <Box className="orders-support__eyebrow">Need assistance?</Box>

              <Box className="orders-support__title">We are here to help.</Box>

              <Box className="orders-support__description">
                Contact our team for help with delivery, assembly, returns, or
                your furniture order.
              </Box>

              <button type="button" className="orders-support__button">
                Contact support
              </button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </main>
  );
}
