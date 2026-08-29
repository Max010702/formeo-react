import { Box, Container, Stack } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../css/home.css";

SwiperCore.use([Autoplay, Navigation, Pagination]);

interface FurnitureEvent {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  date: string;
  location: string;
}

const furnitureEvents: FurnitureEvent[] = [
  {
    id: 1,
    title: "The Art of Timeless Living",
    category: "Design exhibition",
    image: "/img/event-living-room.webp",
    description:
      "Explore a curated collection where natural materials and timeless forms come together.",
    date: "September 14, 2026",
    location: "Forma Showroom, Seoul",
  },
  {
    id: 2,
    title: "Crafted in Natural Oak",
    category: "Maker workshop",
    image: "/img/event-oak-workshop.webp",
    description:
      "Meet our artisans and discover how carefully selected oak becomes furniture made to last.",
    date: "October 3, 2026",
    location: "Design District, Seoul",
  },
  {
    id: 3,
    title: "A New Language of Comfort",
    category: "Collection preview",
    image: "/img/event-sofa.webp",
    description:
      "Experience our newest seating collection through soft silhouettes, warm textures, and comfort.",
    date: "October 22, 2026",
    location: "Forma Gallery, Busan",
  },
  {
    id: 4,
    title: "Objects for Thoughtful Homes",
    category: "Private presentation",
    image: "/img/event-furniture.webp",
    description:
      "A private presentation celebrating meaningful objects designed for everyday living.",
    date: "November 8, 2026",
    location: "Forma House, Seoul",
  },
];

export default function Events() {
  return (
    <section className="events">
      <Container className="events__container">
        <Stack className="events__heading">
          <Box>
            <Box className="events__eyebrow">Journal and gatherings</Box>

            <Box component="h2" className="events__title">
              Design <span>events</span>
            </Box>
          </Box>

          <Box className="events__introduction">
            Join conversations, exhibitions, and workshops exploring furniture,
            craftsmanship, and contemporary living.
          </Box>
        </Stack>

        <Swiper
          className="events__slider"
          slidesPerView="auto"
          centeredSlides
          spaceBetween={24}
          loop={furnitureEvents.length > 2}
          navigation={
            {
              previousEl: ".events__previous",
              nextEl: ".events__next",
            } as never
          }
          pagination={{
            el: ".events__pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {furnitureEvents.map((event, index) => (
            <SwiperSlide key={event.id} className="event-card">
              <Box className="event-card__image-wrapper">
                <img
                  src={event.image}
                  className="event-card__image"
                  alt={event.title}
                  loading="lazy"
                />

                <Box className="event-card__overlay" />

                <Box className="event-card__number">
                  {String(index + 1).padStart(2, "0")}
                </Box>

                <Box className="event-card__category">{event.category}</Box>
              </Box>

              <Stack className="event-card__content">
                <Box>
                  <Box component="h3" className="event-card__title">
                    {event.title}
                  </Box>

                  <Box className="event-card__description">
                    {event.description}
                  </Box>
                </Box>

                <Stack className="event-card__bottom">
                  <Stack className="event-card__details">
                    <Stack className="event-card__detail">
                      <CalendarMonthOutlinedIcon />
                      <span>{event.date}</span>
                    </Stack>

                    <Stack className="event-card__detail">
                      <LocationOnOutlinedIcon />
                      <span>{event.location}</span>
                    </Stack>
                  </Stack>

                  <Box
                    component="button"
                    type="button"
                    className="event-card__button"
                    aria-label={`View ${event.title}`}
                  >
                    <ArrowOutwardIcon />
                  </Box>
                </Stack>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>

        <Stack className="events__controls">
          <button
            type="button"
            className="events__arrow events__previous"
            aria-label="Previous event"
          >
            <ArrowBackIcon />
          </button>

          <Box className="events__pagination" />

          <button
            type="button"
            className="events__arrow events__next"
            aria-label="Next event"
          >
            <ArrowForwardIcon />
          </button>
        </Stack>
      </Container>
    </section>
  );
}
