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

import { useDispatch, useSelector } from "react-redux";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { serverApi } from "../../lib/config";
import type { Product } from "../../lib/types/product";
import {
  ProductCategories,
  type ProductCategories as ProductCategoriesType,
} from "../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

type SortOption = "new" | "price" | "views";
type Category = "ALL" | ProductCategoriesType;

const categories: Category[] = [
  "ALL",
  ProductCategories.SOFAS,
  ProductCategories.CHAIRS,
  ProductCategories.TABLES,
  ProductCategories.BEDS,
  ProductCategories.WARDROBES,
  ProductCategories.BOOKSHELVES,
  ProductCategories.DESKS,
  ProductCategories.DECOR,
  ProductCategories.LIGHTING,
  ProductCategories.OTHER,
];

const formatText = (value: string) =>
  value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [searchInput, setSearchInput] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<Category>("ALL");
  const [sort, setSort] = React.useState<SortOption>("new");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const productService = new ProductService();

    const order =
      sort === "price"
        ? "productPrice"
        : sort === "views"
          ? "productView"
          : "createdAt";

    productService
      .getProducts({
        page,
        limit: 8,
        order,
        productCategories: category === "ALL" ? undefined : category,
        search: search || undefined,
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("getProducts error:", error);
        setProducts([]);
      });
  }, [page, category, sort, search]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
                value={searchInput}
                placeholder="Search furniture"
                aria-label="Search furniture"
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={handleSearchKeyDown}
              />

              <Button
                className="products-search__button"
                onClick={handleSearch}
              >
                Search
              </Button>
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
                  {formatText(item)}
                </Button>
              ))}
            </Stack>

            <Stack className="products-sorting">
              <span>Sort by</span>

              {(["new", "price", "views"] as SortOption[]).map((item) => (
                <Button
                  key={item}
                  className={`products-sort ${sort === item ? "active" : ""}`}
                  onClick={() => {
                    setSort(item);
                    setPage(1);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Stack className="products-result-heading">
            <Box component="h2">
              {category === "ALL" ? "All furniture" : formatText(category)}
            </Box>

            <span>{products.length} products</span>
          </Stack>

          {products.length > 0 ? (
            <Box className="products-grid">
              {products.map((product: Product) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/images/product-placeholder.webp";

                const createdAt = new Date(product.createdAt).getTime();
                const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
                const isNew = createdAt >= thirtyDaysAgo;

                return (
                  <Box
                    component="article"
                    className="catalog-card"
                    key={product._id}
                  >
                    <Box className="catalog-card__media">
                      <img
                        src={imagePath}
                        alt={product.productName}
                        loading="lazy"
                      />

                      {isNew && <Box className="catalog-card__label">New</Box>}

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
                        <span>{formatText(product.productCategories)}</span>

                        <Stack>
                          <VisibilityOutlinedIcon />
                          {product.productView}
                        </Stack>
                      </Stack>

                      <Box component="h3" className="catalog-card__name">
                        {product.productName}
                      </Box>

                      <Stack className="catalog-card__footer">
                        <Box className="catalog-card__material">
                          {formatText(product.productMaterial)} ·{" "}
                          {formatText(product.productColor)}
                        </Box>

                        <Box className="catalog-card__price">
                          ${product.productPrice.toLocaleString()}
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Stack className="products-empty">
              <Box component="h3">No furniture found</Box>

              <Box>Try another search term or furniture category.</Box>
            </Stack>
          )}

          <Stack className="products-pagination">
            <Pagination
              count={3}
              page={page}
              onChange={(_event, selectedPage) => setPage(selectedPage)}
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
