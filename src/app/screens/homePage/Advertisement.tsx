import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import "../../../css/home.css";

export default function Advertisement() {
  return (
    <section className="advertisement">
      <video
        className="advertisement__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero.png"
      >
        <source src="/video/furniture-ads.mp4" type="video/mp4" />
      </video>

      <Box className="advertisement__overlay" />

      <Container className="advertisement__container">
        <Stack className="advertisement__content">
          <Stack className="advertisement__eyebrow">
            <Box className="advertisement__line" />
            <span>Designed for everyday living</span>
          </Stack>

          <Box component="h2" className="advertisement__title">
            A home shaped by
            <span> timeless design.</span>
          </Box>

          <Box className="advertisement__description">
            Discover thoughtfully crafted furniture where natural materials,
            lasting comfort, and refined details come together.
          </Box>

          <Stack className="advertisement__actions">
            <Button
              component={NavLink}
              to="/products"
              variant="contained"
              className="advertisement__primary-button"
            >
              Explore collection
            </Button>

            <Button
              component={NavLink}
              to="/help"
              variant="text"
              className="advertisement__story-button"
              startIcon={
                <Box className="advertisement__play-icon">
                  <PlayArrowRoundedIcon />
                </Box>
              }
            >
              Our design story
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box className="advertisement__scroll-text">
        <span>Discover</span>
        <Box />
      </Box>
    </section>
  );
}
