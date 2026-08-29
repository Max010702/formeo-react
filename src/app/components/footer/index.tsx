import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/footer.css";

export default function Footer() {
  const authMember = null;

  return (
    <footer className="footer">
      <Container className="footer__container">
        <Stack className="footer__content">
          <Stack className="footer__brand-section">
            <NavLink to="/" className="footer__brand-link">
              <img
                className="footer__logo"
                src="/icons/burak.svg"
                alt="Furniture brand"
              />
            </NavLink>

            <Box className="footer__description">
              Thoughtfully designed furniture made from quality materials. We
              create timeless pieces that bring comfort, warmth, and character
              into your home.
            </Box>

            <Stack className="footer__socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <img src="/icons/facebook.svg" alt="" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <img src="/icons/twitter.svg" alt="" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src="/icons/instagram.svg" alt="" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <img src="/icons/youtube.svg" alt="" />
              </a>
            </Stack>
          </Stack>

          <Stack className="footer__navigation">
            <Box className="footer__column">
              <Box className="footer__title">Explore</Box>

              <Stack className="footer__links">
                <NavLink exact to="/">
                  Home
                </NavLink>

                <NavLink to="/products">Products</NavLink>

                {authMember ? <NavLink to="/orders">Orders</NavLink> : null}

                <NavLink to="/help">Help</NavLink>
              </Stack>
            </Box>

            <Box className="footer__column">
              <Box className="footer__title">Collections</Box>

              <Stack className="footer__links">
                <NavLink to="/products?category=living-room">
                  Living room
                </NavLink>

                <NavLink to="/products?category=bedroom">Bedroom</NavLink>

                <NavLink to="/products?category=dining">Dining room</NavLink>

                <NavLink to="/products?category=office">Home office</NavLink>
              </Stack>
            </Box>

            <Box className="footer__column footer__contact-column">
              <Box className="footer__title">Visit our showroom</Box>

              <Stack className="footer__contact-list">
                <Box className="footer__contact-item">
                  <span>Address</span>
                  <p>Downtown, Dubai</p>
                </Box>

                <Box className="footer__contact-item">
                  <span>Phone</span>
                  <a href="tel:+97145547777">+971 4 554 7777</a>
                </Box>

                <Box className="footer__contact-item">
                  <span>Email</span>
                  <a href="mailto:hello@forma.com">hello@forma.com</a>
                </Box>

                <Box className="footer__contact-item">
                  <span>Hours</span>
                  <p>Mon–Sat, 9:00–20:00</p>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Box className="footer__newsletter">
          <Box>
            <Box className="footer__newsletter-title">
              Inspiration, delivered.
            </Box>

            <Box className="footer__newsletter-text">
              Receive new collections, design stories, and private offers.
            </Box>
          </Box>

          <Button
            component={NavLink}
            to="/signup"
            variant="outlined"
            className="footer__signup-button"
          >
            Join our newsletter
          </Button>
        </Box>

        <Stack className="footer__bottom">
          <Box>© {new Date().getFullYear()} Forma Furniture.</Box>

          <Stack className="footer__legal-links">
            <NavLink to="/privacy">Privacy policy</NavLink>
            <NavLink to="/terms">Terms & conditions</NavLink>
          </Stack>
        </Stack>
      </Container>
    </footer>
  );
}
