import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Advertisement from "./Advertisement";
import Events from "./Events";
import NewProducts from "./NewProducts";
import PopularProducts from "./PopularProducts";
import Statistics from "./Statistic";
import {
  setNewProducts,
  setPopularProducts,
} from "./slice";
import ProductService from "../../services/ProductService";

import "../../../css/home.css";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const productService = new ProductService();

    const loadHomeProducts = async () => {
      try {
        const [popularProducts, newProducts] =
          await Promise.all([
            productService.getProducts({
              page: 1,
              limit: 4,
              order: "productView",
            }),

            productService.getProducts({
              page: 1,
              limit: 4,
              order: "createdAt",
            }),
          ]);

        dispatch(
          setPopularProducts(popularProducts),
        );

        dispatch(setNewProducts(newProducts));
      } catch (error) {
        console.error(
          "Failed to load home products:",
          error,
        );
      }
    };

    void loadHomeProducts();
  }, [dispatch]);

  return (
    <main className="homepage">
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <Events />
    </main>
  );
}