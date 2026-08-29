import React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../../../css/products.css";

type SortOption = "new" | "price" | "views";
type Category = "All" | "Living Room" | "Dining" | "Bedroom" | "Office";

interface Product {
  id: number;
  productName: string;
  imagePath: string;
  category: Exclude<Category, "All">;
  material: string;
  price: number;
  views: number;
  isNew: boolean;
}

const products: Product[] = [
  {
    id: 1,
    productName: "Cloud Modular Sofa",
    imagePath: "/img/sofa.webp",
    category: "Living Room",
    material: "Bouclé upholstery",
    price: 1890,
    views: 120,
    isNew: true,
  },
  {
    id: 2,
    productName: "Cane Lounge Chair",
    imagePath: "/img/lounge-chair.webp",
    category: "Living Room",
    material: "Oak and natural cane",
    price: 680,
    views: 85,
    isNew: false,
  },
  {
    id: 3,
    productName: "Linea Oak Table",
    imagePath: "/img/dining-table.webp",
    category: "Dining",
    material: "Solid European oak",
    price: 1240,
    views: 98,
    isNew: true,
  },
  {
    id: 4,
    productName: "Nova Coffee Table",
    imagePath: "/img/coffee-table.webp",
    category: "Living Room",
    material: "Travertine stone",
    price: 760,
    views: 75,
    isNew: false,
  },
  {
    id: 5,
    productName: "Haven King Bed",
    imagePath: "/img/bed.webp",
    category: "Bedroom",
    material: "Linen upholstery",
    price: 1560,
    views: 76,
    isNew: true,
  },
  {
    id: 6,
    productName: "Noma Bedside Table",
    imagePath: "/img/bedside-table.webp",
    category: "Bedroom",
    material: "Walnut veneer",
    price: 395,
    views: 52,
    isNew: false,
  },
  {
    id: 7,
    productName: "Elysian Bookshelf",
    imagePath: "/img/bookshelf.webp",
    category: "Office",
    material: "Smoked oak",
    price: 990,
    views: 64,
    isNew: false,
  },
  {
    id: 8,
    productName: "Arco Dining Chair",
    imagePath: "/img/modern-chair.webp",
    category: "Dining",
    material: "Ash wood",
    price: 320,
    views: 45,
    isNew: true,
  },
];

const categories: Category[] = [
  "All",
  "Living Room",
  "Dining",
  "Bedroom",
  "Office",
];

export default function Products() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<Category>("All");
  const [sort, setSort] = React.useState<SortOption>("new");
  const [page, setPage] = React.useState(1);

  const filteredProducts = React.useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "views") return b.views - a.views;
      return Number(b.isNew) - Number(a.isNew);
    });
  }, [search, category, sort]);

  return (
    <main className="products-page">
      <section className="products-hero">
        <Container className="products-container">
          <Stack className="products-hero__content">
            <Box className="products-hero__eyebrow">Furniture collection</Box>

            <Box component="h1" className="products-hero__title">
              Designed for a<span> thoughtful home.</span>
            </Box>

            <Box className="products-hero__description">
              Explore timeless furniture shaped by natural materials, considered
              details, and lasting comfort.
            </Box>

            <Box className="products-search">
              <SearchIcon />

              <input
                type="search"
                value={search}
                placeholder="Search furniture"
                aria-label="Search furniture"
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />

              <Button className="products-search__button">Search</Button>
            </Box>
          </Stack>
        </Container>
      </section>

      <section className="products-catalog">
        <Container className="products-container">
          <Stack className="products-toolbar">
            <Stack className="products-categories">
              {categories.map((item) => (
                <Button
                  key={item}
                  className={`products-category ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => {
                    setCategory(item);
                    setPage(1);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            <Stack className="products-sorting">
              <span>Sort by</span>

              {(["new", "price", "views"] as SortOption[]).map((item) => (
                <Button
                  key={item}
                  className={`products-sort ${sort === item ? "active" : ""}`}
                  onClick={() => setSort(item)}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Stack className="products-result-heading">
            <Box component="h2">
              {category === "All" ? "All furniture" : category}
            </Box>

            <span>{filteredProducts.length} products</span>
          </Stack>

          {filteredProducts.length > 0 ? (
            <Box className="products-grid">
              {filteredProducts.map((product) => (
                <Box
                  component="article"
                  className="catalog-card"
                  key={product.id}
                >
                  <Box className="catalog-card__media">
                    <img
                      src={product.imagePath}
                      alt={product.productName}
                      loading="lazy"
                    />

                    {product.isNew && (
                      <Box className="catalog-card__label">New</Box>
                    )}

                    <Stack className="catalog-card__actions">
                      <IconButton
                        className="catalog-card__action"
                        aria-label={`Add ${product.productName} to basket`}
                      >
                        <ShoppingBagOutlinedIcon />
                      </IconButton>

                      <IconButton
                        className="catalog-card__action"
                        aria-label={`View ${product.productName}`}
                      >
                        <ArrowOutwardIcon />
                      </IconButton>
                    </Stack>
                  </Box>

                  <Box className="catalog-card__content">
                    <Stack className="catalog-card__meta">
                      <span>{product.category}</span>

                      <Stack>
                        <VisibilityOutlinedIcon />
                        {product.views}
                      </Stack>
                    </Stack>

                    <Box component="h3" className="catalog-card__name">
                      {product.productName}
                    </Box>

                    <Stack className="catalog-card__footer">
                      <Box className="catalog-card__material">
                        {product.material}
                      </Box>

                      <Box className="catalog-card__price">
                        ${product.price.toLocaleString()}
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Stack className="products-empty">
              <Box component="h3">No furniture found</Box>
              <Box>Try another search term or product category.</Box>
            </Stack>
          )}

          <Stack className="products-pagination">
            <Pagination
              count={3}
              page={page}
              onChange={(_, selectedPage) => setPage(selectedPage)}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  slots={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                />
              )}
            />
          </Stack>
        </Container>
      </section>

      <section className="products-materials">
        <Container className="products-container">
          <Box className="products-materials__eyebrow">
            Our material philosophy
          </Box>

          <Box component="h2" className="products-materials__title">
            Honest materials,
            <span> made to last.</span>
          </Box>

          <Box className="products-materials__grid">
            {[
              ["01", "Solid wood"],
              ["02", "Natural stone"],
              ["03", "Quality textiles"],
              ["04", "Durable metals"],
            ].map(([number, name]) => (
              <Stack className="material-item" key={number}>
                <span>{number}</span>
                <strong>{name}</strong>
              </Stack>
            ))}
          </Box>
        </Container>
      </section>
    </main>
  );
}
