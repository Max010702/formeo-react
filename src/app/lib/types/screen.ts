import type { Member } from "./member";
import type { Product } from "./product";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}

/** HOME PAGE */
export interface HomePageState {
  popularProducts: Product[];
  newProducts: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE */
export interface ProductsPageState {
  restaurant: Member | null;
  choosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE */
