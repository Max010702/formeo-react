import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../../../css/home.css";

interface Product {
  id: number;
  productName: string;
  category: string;
  imagePath: string;
  description: string;
  price: number;
  views: number;
}

const products: Product[] = [
  {
    id: 1,
    productName: "Cloud Modular Sofa",
    category: "Living room",
    imagePath: "/img/sofa.webp",
    description: "Soft curves and generous comfort for modern living.",
    price: 1890,
    views: 120,
  },
  {
    id: 2,
    productName: "Oak Dining Table",
    category: "Dining room",
    imagePath: "/img/dining-table.webp",
    description: "A timeless solid-oak table crafted for shared moments.",
    price: 1240,
    views: 98,
  },
  {
    id: 3,
    productName: "Cane Lounge Chair",
    category: "Lounge",
    imagePath: "/img/lounge-chair.webp",
    description: "Natural materials paired with a relaxed silhouette.",
    price: 680,
    views: 85,
  },
  {
    id: 4,
    productName: "Haven King Bed",
    category: "Bedroom",
    imagePath: "/img/bed.webp",
    description: "An elegant upholstered bed designed for restful nights.",
    price: 1560,
    views: 76,
  },
  {
    id: 5,
    productName: "Haven King Bed",
    category: "Bedroom",
    imagePath: "/img/bed.webp",
    description: "An elegant upholstered bed designed for restful nights.",
    price: 1560,
    views: 76,
  },
];

export default function PopularProducts() {
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
          {products.length > 0 ? (
            <Box className="popular-products__grid">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className={`product-card ${
                    index === 0 ? "product-card--featured" : ""
                  }`}
                >
                  <CardCover>
                    <img
                      src={product.imagePath}
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
                        <span>{product.views}</span>
                      </Stack>
                    </Stack>

                    <Box className="product-card__information">
                      <Box className="product-card__category">
                        {product.category}
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
                          className="product-card__open-button"
                          aria-label={`View ${product.productName}`}
                        >
                          <ArrowOutwardIcon />
                        </Box>
                      </Stack>

                      <Box className="product-card__description">
                        {product.description}
                      </Box>

                      <Box className="product-card__divider" />

                      <Stack className="product-card__footer">
                        <Box className="product-card__price-label">
                          Starting from
                        </Box>

                        <Box className="product-card__price">
                          ${product.price.toLocaleString()}
                        </Box>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Stack className="popular-products__empty">
              <Box>No popular furniture is available.</Box>
            </Stack>
          )}
        </CssVarsProvider>
      </Container>
    </section>
  );
}
