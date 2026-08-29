import { Box, Button, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Settings } from "./Settings";
import "../../../css/userPage.css";

const member = {
  name: "Martin Robertson",
  role: "Private customer",
  image: "/icons/default-user.svg",
  address: "Address has not been added",
  description:
    "Inspired by thoughtful interiors, natural materials, and furniture designed to last.",
};

export default function UserPage() {
  return (
    <main className="user-page">
      <section className="user-page__header">
        <Container className="user-page__container">
          <Box className="user-page__eyebrow">Member account</Box>

          <Box component="h1" className="user-page__title">
            My <span>profile</span>
          </Box>

          <Box className="user-page__description">
            Manage your personal information, delivery details, and account
            preferences.
          </Box>
        </Container>
      </section>

      <Container className="user-page__container">
        <Box className="user-page__layout">
          <Box className="user-settings">
            <Stack className="user-settings__heading">
              <Box>
                <Box className="user-settings__number">01</Box>

                <Box component="h2" className="user-settings__title">
                  Personal details
                </Box>
              </Box>

              <Box className="user-settings__description">
                Keep your account and delivery information up to date.
              </Box>
            </Stack>

            <Box className="user-settings__content">
              <Settings />
            </Box>
          </Box>

          <Stack className="user-profile-sidebar">
            <Box className="user-profile-card">
              <Stack className="user-profile-card__top">
                <Box className="user-profile-card__image-wrapper">
                  <img
                    src={member.image}
                    className="user-profile-card__image"
                    alt={member.name}
                  />

                  <Box className="user-profile-card__verified">
                    <VerifiedOutlinedIcon />
                  </Box>
                </Box>

                <Button
                  className="user-profile-card__edit"
                  aria-label="Edit profile"
                >
                  <EditOutlinedIcon />
                </Button>
              </Stack>

              <Box className="user-profile-card__eyebrow">Forma member</Box>

              <Box className="user-profile-card__name">{member.name}</Box>

              <Box className="user-profile-card__role">{member.role}</Box>

              <Stack className="user-profile-card__address">
                <LocationOnOutlinedIcon />
                <span>{member.address}</span>
              </Stack>

              <Box className="user-profile-card__divider" />

              <Box className="user-profile-card__description">
                {member.description}
              </Box>

              <Stack className="user-profile-card__socials">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                >
                  <TelegramIcon />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <YouTubeIcon />
                </a>
              </Stack>
            </Box>

            <Box className="user-profile-stats">
              <Box className="user-profile-stats__title">Account overview</Box>

              <Box className="user-profile-stats__grid">
                <Stack className="user-profile-stat">
                  <ShoppingBagOutlinedIcon />
                  <strong>4</strong>
                  <span>Orders</span>
                </Stack>

                <Stack className="user-profile-stat">
                  <FavoriteBorderOutlinedIcon />
                  <strong>12</strong>
                  <span>Saved pieces</span>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </main>
  );
}
