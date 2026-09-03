import React from "react";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "../../../css/products.css";

import { useDispatch, useSelector } from "react-redux";
import { type Dispatch } from "@reduxjs/toolkit";
import { setChoosenProduct, setRestaurant } from "./slice";
import { createSelector } from "reselect";
import { retrieveChoosenProduct, retrieveRestaurant } from "./selector";
import type { Product } from "../../lib/types/product";

/** REDUX SLICE % SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Product[]) => dispatch(setRestaurant(data)),
  setChoosenProduct: (data: Product[]) => dispatch(setChoosenProduct(data)),
});

const choosenProductRetriever = createSelector(
  retrieveChoosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  }),
);
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  }),
);
const product = {
  name: "Cloud Modular Sofa",
  category: "Living Room",
  collection: "Forma Living Collection",
  price: 1890,
  rating: 4.5,
  reviews: 28,
  views: 120,
  description:
    "A generously proportioned modular sofa designed for slow, comfortable living. Its sculptural curves, deep seating, and tactile bouclé upholstery bring warmth and softness into contemporary interiors.",
  material: "Premium bouclé upholstery",
  frame: "Solid oak and reinforced hardwood",
  dimensions: "W 240 × D 102 × H 72 cm",
  color: "Natural ivory",
  images: ["/img/sofa.webp", "/img/comfort-sofa.webp", "/img/sofa-detail.webp"],
};

export default function ChosenProduct() {
  const [quantity, setQuantity] = React.useState(1);
  const [activeImage, setActiveImage] = React.useState(0);
  const swiperRef = React.useRef<any>(null);

  const selectImage = (index: number) => {
    setActiveImage(index);
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <main className="chosen-product">
      <Container className="chosen-product__container">
        <Box className="chosen-product__breadcrumb">
          Home <span>/</span> Products <span>/</span> {product.name}
        </Box>

        <Box className="chosen-product__layout">
          <Stack className="chosen-product__gallery">
            <Swiper
              loop
              navigation
              modules={[Navigation]}
              className="chosen-product__slider"
              onSwiper={(swiper: any) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper: {
                realIndex: React.SetStateAction<number>;
              }) => {
                setActiveImage(swiper.realIndex);
              }}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={image}>
                  <img
                    className="chosen-product__image"
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Stack className="chosen-product__thumbnails">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`chosen-product__thumbnail ${
                    activeImage === index ? "active" : ""
                  }`}
                  onClick={() => selectImage(index)}
                  aria-label={`Show ${product.name} image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </Stack>
          </Stack>

          <Stack className="chosen-product__information">
            <Box className="chosen-product__eyebrow">{product.category}</Box>

            <Box component="h1" className="chosen-product__name">
              {product.name}
            </Box>

            <Box className="chosen-product__collection">
              {product.collection}
            </Box>

            <Stack className="chosen-product__rating-row">
              <Rating
                name="product-rating"
                value={product.rating}
                precision={0.5}
                readOnly
              />

              <span>
                {product.rating} ({product.reviews} reviews)
              </span>

              <Box className="chosen-product__views">
                <VisibilityOutlinedIcon />
                {product.views}
              </Box>
            </Stack>

            <Box className="chosen-product__description">
              {product.description}
            </Box>

            <Box className="chosen-product__specifications">
              <Stack className="chosen-product__specification">
                <span>Material</span>
                <strong>{product.material}</strong>
              </Stack>

              <Stack className="chosen-product__specification">
                <span>Frame</span>
                <strong>{product.frame}</strong>
              </Stack>

              <Stack className="chosen-product__specification">
                <span>Dimensions</span>
                <strong>{product.dimensions}</strong>
              </Stack>

              <Stack className="chosen-product__specification">
                <span>Color</span>
                <strong>{product.color}</strong>
              </Stack>
            </Box>

            <Stack className="chosen-product__purchase">
              <Box>
                <Box className="chosen-product__price-label">Price</Box>

                <Box className="chosen-product__price">
                  ${product.price.toLocaleString()}
                </Box>
              </Box>

              <Stack className="chosen-product__quantity">
                <Button
                  aria-label="Decrease quantity"
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  <RemoveIcon />
                </Button>

                <span>{quantity}</span>

                <Button
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Stack>

            <Button
              variant="contained"
              startIcon={<ShoppingBagOutlinedIcon />}
              className="chosen-product__basket-button"
            >
              Add to basket · ${(product.price * quantity).toLocaleString()}
            </Button>

            <Box className="chosen-product__services">
              <Stack className="chosen-product__service">
                <LocalShippingOutlinedIcon />
                <Box>
                  <strong>Premium delivery</strong>
                  <span>Delivered carefully to your room</span>
                </Box>
              </Stack>

              <Stack className="chosen-product__service">
                <VerifiedOutlinedIcon />
                <Box>
                  <strong>Quality guarantee</strong>
                  <span>Crafted from selected materials</span>
                </Box>
              </Stack>

              <Stack className="chosen-product__service">
                <ReplayOutlinedIcon />
                <Box>
                  <strong>Easy returns</strong>
                  <span>Returns available on eligible items</span>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </main>
  );
}
