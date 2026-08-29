import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../../../css/home.css";

interface Product {
  id: number;
  productName: string;
  imagePath: string;
  category: string;
  size: string;
  price: number;
  views: number;
}

const newProducts: Product[] = [
  {
    id: 1,
    productName: "Arco Lounge Chair",
    imagePath: "/img/modern-chair.webp",
    category: "Lounge",
    size: "Standard size",
    price: 120,
    views: 45,
  },
  {
    id: 2,
    productName: "Linea Oak Table",
    imagePath: "/img/wooden-table.webp",
    category: "Dining",
    size: "Large size",
    price: 250,
    views: 32,
  },
  {
    id: 3,
    productName: "Cloud Comfort Sofa",
    imagePath: "/img/comfort-sofa.webp",
    category: "Living room",
    size: "Three seats",
    price: 480,
    views: 67,
  },
  {
    id: 4,
    productName: "Noma Bedside Table",
    imagePath: "/img/bedside-table.webp",
    category: "Bedroom",
    size: "Compact size",
    price: 95,
    views: 28,
  },
];

export default function NewProducts() {
  return (
    <section className="new-products">
      <Container className="new-products__container">
        <Stack className="new-products__heading">
          <Box>
            <Box className="new-products__eyebrow">Just arrived</Box>

            <Box component="h2" className="new-products__title">
              New <span>collection</span>
            </Box>
          </Box>

          <Box className="new-products__description">
            Explore our latest furniture, shaped by natural materials,
            considered details, and timeless design.
          </Box>
        </Stack>

        <CssVarsProvider>
          {newProducts.length > 0 ? (
            <Box className="new-products__grid">
              {newProducts.map((product, index) => (
                <Card
                  key={product.id}
                  variant="outlined"
                  className="new-product-card"
                >
                  <CardOverflow className="new-product-card__media">
                    <AspectRatio ratio="4/5">
                      <img
                        src={product.imagePath}
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
                        {product.category}
                      </Box>

                      <Stack className="new-product-card__views">
                        <VisibilityOutlinedIcon />
                        <span>{product.views}</span>
                      </Stack>
                    </Stack>

                    <Box component="h3" className="new-product-card__name">
                      {product.productName}
                    </Box>

                    <Stack className="new-product-card__footer">
                      <Box>
                        <Box className="new-product-card__size">
                          {product.size}
                        </Box>

                        <Box className="new-product-card__availability">
                          Ready to order
                        </Box>
                      </Box>

                      <Box className="new-product-card__price">
                        ${product.price.toLocaleString()}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
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
