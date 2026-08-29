import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newProducts = [
  {
    productName: "Modern Chair",
    imagePath: "/img/modern-chair.webp",
    size: "Standard size",
    price: 120,
    views: 45,
  },
  {
    productName: "Wooden Table",
    imagePath: "/img/wooden-table.webp",
    size: "Large size",
    price: 250,
    views: 32,
  },
  {
    productName: "Comfort Sofa",
    imagePath: "/img/comfort-sofa.webp",
    size: "Three seats",
    price: 480,
    views: 67,
  },
  {
    productName: "Bedside Table",
    imagePath: "/img/bedside-table.webp",
    size: "Compact size",
    price: 95,
    views: 28,
  },
];

export default function NewProducts() {
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">New Products</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {newProducts.map((product) => (
                <Card
                  key={product.productName}
                  variant="outlined"
                  className="product-card"
                >
                  <CardOverflow>
                    <div className="product-sale">{product.size}</div>

                    <AspectRatio ratio={1}>
                      <img
                        src={product.imagePath}
                        alt={product.productName}
                        loading="lazy"
                      />
                    </AspectRatio>
                  </CardOverflow>

                  <CardOverflow variant="soft" className="product-detail">
                    <Stack
                      className="info"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Typography className="title">
                          {product.productName}
                        </Typography>

                        <Divider width={2} height={24} bg="#d9d9d9" />

                        <Typography className="price">
                          ${product.price}
                        </Typography>
                      </Stack>

                      <Typography className="views">
                        {product.views}

                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                    </Stack>
                  </CardOverflow>
                </Card>
              ))}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
