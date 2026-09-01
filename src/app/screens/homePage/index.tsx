import Advertisement from "./Advertisement";
import Events from "./Events";
import PopularProducts from "./PopularProducts";
import Statistics from "./Statistic";
import "../../../css/home.css";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewProducts, setPopularProducts } from "./slice";
import type { Product } from "../../lib/types/product";
import { retrievePopularProducts } from "./selector";
import ProductService from "../../services/ProductService";
import NewProducts from "./NewProducts";

/** REDUX SLICE % SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
});

const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts }),
);

export default function HomePage() {
  const { setPopularProducts, setNewProducts } = actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server data fetch => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setNewProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <Events />
    </div>
  );
}
