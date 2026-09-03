import {
  Badge,
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../lib/config";
import { ProductCategories } from "../../lib/enums/product.enum";
import type { Product, ProductInquiry } from "../../lib/types/product";
import type { CartItem } from "../../lib/types/search";

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const furnitureCategories = Object.values(ProductCategories);

export default function Products({ onAdd }: ProductsProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(retrieveProducts);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const productService = new ProductService();

    productService
      .getProducts(productSearch)
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      });
  }, [dispatch, productSearch]);

  const searchCategoryHandler = (category?: ProductCategories) => {
    setProductSearch((previous) => ({
      ...previous,
      page: 1,
      productCategories: category,
    }));
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch((previous) => ({
      ...previous,
      page: 1,
      order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch((previous) => ({
      ...previous,
      page: 1,
      search: searchText.trim(),
    }));
  };

  const searchTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchText(value);

    if (value === "") {
      setProductSearch((previous) => ({
        ...previous,
        page: 1,
        search: "",
      }));
    }
  };

  const paginationHandler = (_event: ChangeEvent<unknown>, page: number) => {
    setProductSearch((previous) => ({
      ...previous,
      page,
    }));
  };

  const chooseProductHandler = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  const addToBasketHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    event.stopPropagation();

    onAdd({
      _id: product._id,
      quantity: 1,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages[0] ?? "",
    });
  };

  const formatCategory = (category: string) => {
    return category
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <main className="products">
      <Container>
        <Stack direction="column" alignItems="center">
          <Stack className="avatar-big-box">
            <Stack className="top-text">
              <p>Discover Our Furniture Collection</p>

              <Stack className="single-search-big-box">
                <input
                  type="search"
                  className="single-search-input"
                  name="productSearch"
                  placeholder="Search furniture..."
                  value={searchText}
                  onChange={searchTextHandler}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      searchProductHandler();
                    }
                  }}
                />

                <Button
                  className="single-button-search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                className="order"
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>

              <Button
                variant="contained"
                className="order"
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>

              <Button
                variant="contained"
                className="order"
                color={
                  productSearch.order === "productView"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productView")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <Box className="category-main">
                <Button
                  variant="contained"
                  color={
                    productSearch.productCategories === undefined
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCategoryHandler()}
                >
                  All
                </Button>

                {furnitureCategories.map((category) => (
                  <Button
                    key={category}
                    variant="contained"
                    color={
                      productSearch.productCategories === category
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => searchCategoryHandler(category)}
                  >
                    {formatCategory(category)}
                  </Button>
                ))}
              </Box>
            </Stack>

            <Stack className="product-wrapper">
              {products.length > 0 ? (
                products.map((product: Product) => {
                  const productImage = product.productImages[0];

                  const imagePath = productImage
                    ? productImage.startsWith("http")
                      ? productImage
                      : `${serverApi}/${productImage}`
                    : "/icons/noimage-list.svg";

                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      role="button"
                      tabIndex={0}
                      onClick={() => chooseProductHandler(product._id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          chooseProductHandler(product._id);
                        }
                      }}
                    >
                      <Stack
                        className="product-img"
                        sx={{
                          backgroundImage: `url("${imagePath}")`,
                        }}
                      >
                        <Box className="product-sale">
                          {formatCategory(product.productCategories)}
                        </Box>

                        <Button
                          className="shop-btn"
                          aria-label={`Add ${product.productName} to basket`}
                          disabled={product.productLeftCount <= 0}
                          onClick={(event) =>
                            addToBasketHandler(event, product)
                          }
                        >
                          <img src="/icons/shopping-cart.svg" alt="" />
                        </Button>

                        <Box className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productView}
                            color="secondary"
                            showZero
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productView === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Box>
                      </Stack>

                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>

                        <Box className="product-price">
                          <MonetizationOnIcon />
                          {product.productPrice.toLocaleString()}
                        </Box>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              page={productSearch.page}
              count={
                products.length === productSearch.limit
                  ? productSearch.page + 1
                  : productSearch.page
              }
              onChange={paginationHandler}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  color="secondary"
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
