import { useEffect } from "react";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Divider from "../../components/divider";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { setChosenProduct, setRestaurant } from "./slice";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { serverApi } from "../../lib/config";
import type { CartItem } from "../../lib/types/search";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  const chosenProduct = useSelector(retrieveChosenProduct);
  const restaurant = useSelector(retrieveRestaurant);

  useEffect(() => {
    if (!productId) return;

    const productService = new ProductService();
    const memberService = new MemberService();

    productService
      .getProduct(productId)
      .then((product) => {
        dispatch(setChosenProduct(product));
      })
      .catch((error) => {
        console.error("Failed to load product:", error);
      });

    memberService
      .getRestaurant()
      .then((member) => {
        dispatch(setRestaurant(member));
      })
      .catch((error) => {
        console.error("Failed to load store:", error);
      });
  }, [dispatch, productId]);

  if (!chosenProduct) {
    return (
      <Stack minHeight="400px" alignItems="center" justifyContent="center">
        Loading product...
      </Stack>
    );
  }

  const handleAddToBasket = () => {
    const cartItem: CartItem = {
      _id: chosenProduct._id,
      name: chosenProduct.productName,
      price: chosenProduct.productPrice,
      image: chosenProduct.productImages[0] ?? "",
      quantity: 1,
    };

    onAdd(cartItem);
  };

  return (
    <section className="chosen-product">
      <Box component="h1" className="title">
        Product Detail
      </Box>

      <Container className="product-container">
        <Stack className="chosen-product-slider">
          {chosenProduct.productImages.length > 0 ? (
            <Swiper
              loop={chosenProduct.productImages.length > 1}
              spaceBetween={10}
              navigation
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper-area"
            >
              {chosenProduct.productImages.map((image, index) => {
                const imagePath = image.startsWith("http")
                  ? image
                  : `${serverApi}/${image}`;

                return (
                  <SwiperSlide key={`${image}-${index}`}>
                    <img
                      className="slider-image"
                      src={imagePath}
                      alt={`${chosenProduct.productName} ${index + 1}`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <Box className="product-image-placeholder">No product image</Box>
          )}
        </Stack>

        <Stack className="chosen-product-info">
          <Box className="info-box">
            <Box className="product-category">
              {chosenProduct.productCategories}
            </Box>

            <strong className="product-name">
              {chosenProduct.productName}
            </strong>

            {restaurant && (
              <Box className="store-information">
                <span className="resto-name">{restaurant.memberNick}</span>

                <span className="resto-name">{restaurant.memberPhone}</span>
              </Box>
            )}

            <Box className="rating-box">
              <Rating
                name="product-rating"
                defaultValue={4.5}
                precision={0.5}
                readOnly
              />

              <Box className="evaluation-box">
                <Box className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "8px" }} />
                  <span>{chosenProduct.productView}</span>
                </Box>
              </Box>
            </Box>

            <Box className="product-specifications">
              <span>Color: {chosenProduct.productColor}</span>
              <span>Material: {chosenProduct.productMaterial}</span>
              <span>Available: {chosenProduct.productLeftCount}</span>
            </Box>

            <p className="product-desc">
              {chosenProduct.productDesc || "No description available."}
            </p>

            <Divider height={1} width={100} bg="#d8d1c7" />
            <Box className="product-price">
              <span>Price</span>
              <strong>${chosenProduct.productPrice.toLocaleString()}</strong>
            </Box>

            <Box className="button-box">
              <Button
                variant="contained"
                disabled={chosenProduct.productLeftCount <= 0}
                onClick={handleAddToBasket}
              >
                {chosenProduct.productLeftCount > 0
                  ? "Add To Basket"
                  : "Out of Stock"}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </section>
  );
}
