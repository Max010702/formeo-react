import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewProducts";
import PopularDishes from "./PopularProducts";
import Statistics from "./Statistic";
import "../../../css/home.css";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import type { Product } from "../../../lib/types/product";
import { retrievePopularDishes } from "./selector";

/** REDUX SLICE % SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);

  useEffect(() => {}, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <Events />
    </div>
  );
}
