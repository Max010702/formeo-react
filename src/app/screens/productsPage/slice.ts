import { createSlice } from "@reduxjs/toolkit";
import type { ProductsPageState } from "../../lib/types/screen";

const initialState: ProductsPageState = {
  restaurant: null,
  choosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChoosenProduct: (state, action) => {
      state.choosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChoosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
