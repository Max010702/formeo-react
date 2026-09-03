import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Rating,
  Stack,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import "swiper/css";
import "swiper/css/navigation";
import "../../../css/products.css";

import { setChoosenProduct } from "./slice";
import { retrieveChoosenProduct, retrieveRestaurant } from "./selector";
import { serverApi } from "../../lib/config";
import ProductService from "../../services/ProductService";

const chosenProductRetriever = createSelector(
  retrieveChoosenProduct,
  (chosenProduct) => ({ chosenProduct }),
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant }),
);

const formatText = (value?: string): string =>
  (value ?? "OTHERNone")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getImageUrl = (image?: string): string => {
  if (!image) {
    return "/images/product-placeholder.webp";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const normalizedServer = serverApi.replace(/\/$/, "");
  const normalizedImage = image.replace(/^\//, "");

  return `${normalizedServer}/${normalizedImage}`;
};

export default function ChosenProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  const [quantity, setQuantity] = React.useState(1);
  const [activeImage, setActiveImage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const swiperRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const productService = new ProductService();

    setLoading(true);

    productService
      .getProduct(productId)
      .then((data) => {
        dispatch(setChoosenProduct(data));
      })
      .catch((error) => {
        console.log("getProduct error:", error);
        dispatch(setChoosenProduct(null));
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      dispatch(setChoosenProduct(null));
    };
  }, [dispatch, productId]);

  const selectImage = (index: number) => {
    setActiveImage(index);
    swiperRef.current?.slideToLoop(index);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    if (!chosenProduct) return;

    setQuantity((current) =>
      Math.min(current + 1, chosenProduct.productLeftCount),
    );
  };

  const addToBasketHandler = () => {
    if (!chosenProduct) return;

    console.log("Add to basket:", {
      product: chosenProduct,
      quantity,
    });
  };

  if (loading) {
    return (
      <Stack className="chosen-product__loading">
        <CircularProgress />
        <span>Loading product...</span>
      </Stack>
    );
  }

  if (!chosenProduct) {
    return (
      <Stack className="chosen-product__not-found">
        <Box component="h2">Product not found</Box>
        <Box>The requested furniture product is unavailable.</Box>
      </Stack>
    );
  }

  const images =
    chosenProduct.productImages?.length > 0
      ? chosenProduct.productImages
      : ["/images/product-placeholder.webp"];

  const category = formatText(chosenProduct.productCategories);
  const material = formatText(chosenProduct.productMaterial);
  const color = formatText(chosenProduct.productColor);

  const totalPrice = Number(chosenProduct.productPrice || 0) * quantity;

  return (
    <main className="chosen-product">
      <Container className="chosen-product__container">
        <Box className="chosen-product__breadcrumb">
          Home <span>/</span> Products <span>/</span>{" "}
          {chosenProduct.productName}
        </Box>

        <Box className="chosen-product__layout">
          <Stack className="chosen-product__gallery">
            <Swiper
              loop={images.length > 1}
              navigation={images.length > 1}
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
              {images.map((image, index) => (
                <SwiperSlide key={`${image}-${index}`}>
                  <img
                    className="chosen-product__image"
                    src={getImageUrl(image)}
                    alt={`${chosenProduct.productName} view ${index + 1}`}
                    onError={(event) => {
                      event.currentTarget.src =
                        "/images/product-placeholder.webp";
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {images.length > 1 && (
              <Stack className="chosen-product__thumbnails">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    className={`chosen-product__thumbnail ${
                      activeImage === index ? "active" : ""
                    }`}
                    onClick={() => selectImage(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={getImageUrl(image)} alt="" />
                  </button>
                ))}
              </Stack>
            )}
          </Stack>

          <Stack className="chosen-product__information">
            <Box className="chosen-product__eyebrow">{category}</Box>

            <Box component="h1" className="chosen-product__name">
              {chosenProduct.productName}
            </Box>

            <Box className="chosen-product__collection">
              {restaurant?.memberNick ?? "Forma Furniture"}
            </Box>

            {restaurant?.memberPhone && (
              <Box className="chosen-product__collection">
                {restaurant.memberPhone}
              </Box>
            )}

            <Stack className="chosen-product__rating-row">
              <Rating value={4.5} precision={0.5} readOnly />

              <span>4.5 customer rating</span>

              <Box className="chosen-product__views">
                <VisibilityOutlinedIcon />
                {chosenProduct.productView ?? 0}
              </Box>
            </Stack>

            <Box className="chosen-product__description">
              {chosenProduct.productDesc ||
                "Thoughtfully designed furniture made with quality materials and lasting comfort."}
            </Box>

            <Box className="chosen-product__specifications">
              <Stack className="chosen-product__specification">
                <span>Category</span>
                <strong>{category}</strong>
              </Stack>

              <Stack className="chosen-product__specification">
                <span>Material</span>
                <strong>{material}</strong>
              </Stack>

              <Stack className="chosen-product__specification">
                <span>Color</span>
                <strong>{color}</strong>
              </Stack>

              <Stack className="chosen-product__specification">
                <span>Availability</span>

                <strong>
                  {chosenProduct.productLeftCount > 0
                    ? `${chosenProduct.productLeftCount} in stock`
                    : "Out of stock"}
                </strong>
              </Stack>
            </Box>

            <Stack className="chosen-product__purchase">
              <Box>
                <Box className="chosen-product__price-label">Price</Box>

                <Box className="chosen-product__price">
                  ${Number(chosenProduct.productPrice).toLocaleString()}
                </Box>
              </Box>

              <Stack className="chosen-product__quantity">
                <Button
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={decreaseQuantity}
                >
                  <RemoveIcon />
                </Button>

                <span>{quantity}</span>

                <Button
                  aria-label="Increase quantity"
                  disabled={
                    chosenProduct.productLeftCount === 0 ||
                    quantity >= chosenProduct.productLeftCount
                  }
                  onClick={increaseQuantity}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Stack>

            <Button
              variant="contained"
              startIcon={<ShoppingBagOutlinedIcon />}
              className="chosen-product__basket-button"
              disabled={chosenProduct.productLeftCount === 0}
              onClick={addToBasketHandler}
            >
              {chosenProduct.productLeftCount > 0
                ? `Add to basket · $${totalPrice.toLocaleString()}`
                : "Out of stock"}
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
