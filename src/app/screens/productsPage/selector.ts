import { createSelector } from "reselect";
import type { AppRootState } from "../../../lib/types/screen";

const celectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
  celectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);

export const retrieveChoosenProduct = createSelector(
  celectProductsPage,
  (ProductsPage) => ProductsPage.choosenProduct,
);

export const retrieveProducts = createSelector(
  celectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
