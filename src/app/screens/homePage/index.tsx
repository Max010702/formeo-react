import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewProducts";
import PopularDishes from "./PopularProducts";
import Statistics from "./Statistic";
import "../../../css/home.css";
import { useEffect } from "react";

export default function HomePage() {
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data
    // Slice: Data => Store
  }, []);

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
