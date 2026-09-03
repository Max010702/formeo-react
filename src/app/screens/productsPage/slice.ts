import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Member } from "../../lib/types/member";
import type { Product } from "../../lib/types/product";
import type { ProductsPageState } from "../../lib/types/screen";

const initialState: ProductsPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Member | null>) => {
      state.restaurant = action.payload;
    },

    setChosenProduct: (state, action: PayloadAction<Product | null>) => {
      state.chosenProduct = action.payload;
    },

    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;

export default ProductsPageReducer;
