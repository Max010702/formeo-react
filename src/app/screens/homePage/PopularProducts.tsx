import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

const list = [
  {
    productName: "Modern Sofa",
    imagePath: "/img/sofa.webp",
    description: "Comfortable modern sofa",
    views: 120,
  },
  {
    productName: "Dining Table",
    imagePath: "/img/dining-table.webp",
    description: "Elegant wooden dining table",
    views: 98,
  },
  {
    productName: "Lounge Chair",
    imagePath: "/img/lounge-chair.webp",
    description: "Stylish and comfortable chair",
    views: 85,
  },
  {
    productName: "King Size Bed",
    imagePath: "/img/bed.webp",
    description: "Modern bed for a perfect rest",
    views: 76,
  },
];

export default function PopularProducts() {
  return (
    <div className="popular-products-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Products</Box>

          <Stack className="cards-frame">
            {list.map((product) => (
              <CssVarsProvider key={product.productName}>
                <Card className="card">
                  <CardCover>
                    <img
                      src={product.imagePath}
                      alt={product.productName}
                      loading="lazy"
                    />
                  </CardCover>

                  <CardCover className="card-cover" />

                  <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        level="h2"
                        fontSize="lg"
                        textColor="#fff"
                        mb={1}
                      >
                        {product.productName}
                      </Typography>

                      <Typography
                        sx={{
                          color: "neutral.300",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {product.views}

                        <VisibilityIcon
                          sx={{ fontSize: 25, marginLeft: "5px" }}
                        />
                      </Typography>
                    </Stack>
                  </CardContent>

                  <CardOverflow
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      py: 1.5,
                      px: "var(--Card-padding)",
                      borderTop: "1px solid",
                      height: "60px",
                    }}
                  >
                    <Typography
                      startDecorator={<DescriptionOutlinedIcon />}
                      textColor="neutral.300"
                    >
                      {product.description}
                    </Typography>
                  </CardOverflow>
                </Card>
              </CssVarsProvider>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
