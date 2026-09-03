import { createSelector } from "reselect";
import type { AppRootState } from "../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.restaurant,
);

export const retrieveChoosenProduct = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.choosenProduct,
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.products,
);
