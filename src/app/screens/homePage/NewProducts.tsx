import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../../../css/home.css";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { serverApi } from "../../lib/config";
import type { Product } from "../../lib/types/product";
/** REDUX SLICE & SELECTOR */
const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  }),
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);

  console.log("newProducts:", newProducts);

  return (
    <section className="new-products">
      <Container className="new-products__container">
        <Stack className="new-products__heading">
          <Box className="new-products__eyebrow">Just arrived</Box>
        </Stack>

        <CssVarsProvider>
          {newProducts.length !== 0 ? (
            <Box className="new-products__grid">
              {newProducts.map((product: Product, index: number) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Card
                    key={product._id}
                    variant="outlined"
                    className="new-product-card"
                  >
                    <CardOverflow className="new-product-card__media">
                      <AspectRatio ratio="4/5">
                        <img
                          src={imagePath}
                          alt={product.productName}
                          loading="lazy"
                        />
                      </AspectRatio>

                      <Box className="new-product-card__label">New</Box>

                      <Box className="new-product-card__number">
                        {String(index + 1).padStart(2, "0")}
                      </Box>

                      <Box
                        component="button"
                        type="button"
                        className="new-product-card__open"
                        aria-label={`View ${product.productName}`}
                      >
                        <ArrowOutwardIcon />
                      </Box>
                    </CardOverflow>

                    <CardContent className="new-product-card__content">
                      <Stack className="new-product-card__metadata">
                        <Box className="new-product-card__category">
                          {product.productCollection}
                        </Box>

                        <Stack className="new-product-card__views">
                          <VisibilityOutlinedIcon />
                          <span>{product.productView}</span>
                        </Stack>
                      </Stack>

                      <Box component="h3" className="new-product-card__name">
                        {product.productName}
                      </Box>

                      <Stack className="new-product-card__footer">
                        <Box>
                          <Box className="new-product-card__size"></Box>

                          <Box className="new-product-card__availability">
                            Ready to order
                          </Box>
                        </Box>

                        <Box className="new-product-card__price">
                          ${product.productPrice.toLocaleString()}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          ) : (
            <Stack className="new-products__empty">
              <Box className="new-products__empty-title">
                New products are coming soon
              </Box>

              <Box className="new-products__empty-text">
                Check back soon to discover our newest furniture collection.
              </Box>
            </Stack>
          )}
        </CssVarsProvider>
      </Container>
    </section>
  );
}
