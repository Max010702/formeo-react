import type { Member } from "./member";
import type { Product } from "./product";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
}

/** HOME PAGE */
export interface HomePageState {
  popularProducts: Product[];
  newProducts: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE */

/** ORDERS PAGE */
