import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { serverApi } from "../../lib/config";
import type { Product } from "../..//lib/types/product";

/** REDUX SLICE & SELECTOR */
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts }),
);

export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  return (
    <section className="popular-products">
      <Container className="popular-products__container">
        <Stack className="popular-products__heading">
          <Box>
            <Box className="popular-products__eyebrow">Curated collection</Box>

            <Box component="h2" className="popular-products__title">
              Most-loved <span>pieces</span>
            </Box>
          </Box>

          <Box className="popular-products__introduction">
            Discover furniture chosen for its lasting design, thoughtful
            craftsmanship, and everyday comfort.
          </Box>
        </Stack>

        <CssVarsProvider>
          {popularProducts.length > 0 ? (
            <Box className="popular-products__grid">
              {popularProducts.map((product: Product, index: number) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/images/product-placeholder.webp";

                const collection = product.productCollection
                  .toLowerCase()
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <Card
                    key={product._id}
                    className={`product-card ${
                      index === 0 ? "product-card--featured" : ""
                    }`}
                  >
                    <CardCover>
                      <img
                        src={imagePath}
                        alt={product.productName}
                        loading="lazy"
                      />
                    </CardCover>

                    <CardCover className="product-card__overlay" />

                    <CardContent className="product-card__content">
                      <Stack className="product-card__top">
                        <Box className="product-card__number">
                          {String(index + 1).padStart(2, "0")}
                        </Box>

                        <Stack className="product-card__views">
                          <VisibilityOutlinedIcon />
                          <span>{product.productView}</span>
                        </Stack>
                      </Stack>

                      <Box className="product-card__information">
                        <Box className="product-card__category">
                          {collection}
                        </Box>

                        <Stack className="product-card__name-row">
                          <Typography
                            component="h3"
                            className="product-card__name"
                          >
                            {product.productName}
                          </Typography>

                          <Box
                            component="button"
                            type="button"
                            className="product-card__open-button"
                            aria-label={`View ${product.productName}`}
                          >
                            <ArrowOutwardIcon />
                          </Box>
                        </Stack>

                        <Box className="product-card__description">
                          {product.productDesc ||
                            "Thoughtfully designed furniture made with quality materials and lasting comfort."}
                        </Box>

                        <Box className="product-card__divider" />

                        <Stack className="product-card__footer">
                          <Box className="product-card__price-label">
                            Starting from
                          </Box>

                          <Box className="product-card__price">
                            ${product.productPrice.toLocaleString()}
                          </Box>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          ) : (
            <Stack className="popular-products__empty">
              <Box className="popular-products__empty-title">
                No popular furniture available
              </Box>

              <Box className="popular-products__empty-text">
                Our most-loved furniture pieces will appear here soon.
              </Box>
            </Stack>
          )}
        </CssVarsProvider>
      </Container>
    </section>
  );
}
