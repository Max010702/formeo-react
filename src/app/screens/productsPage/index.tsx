import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import type { CartItem } from "../../lib/types/search";
import "../../../css/products.css";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage({ onAdd }: ProductsPageProps) {
  const { path } = useRouteMatch();

  return (
    <main className="products-page">
      <Switch>
        <Route exact path={`${path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>

        <Route exact path={path}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </main>
  );
}
