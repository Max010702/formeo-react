import { Component } from "react";

interface FurnitureState {
  productName: string;
  material: string;
  color: string;
  price: number;
}

class Test extends Component<Record<string, never>, FurnitureState> {
  state: FurnitureState = {
    productName: "Cloud Modular Sofa",
    material: "Bouclé",
    color: "Natural Ivory",
    price: 1890,
  };

  changeDetail = () => {
    this.setState({
      productName: "Cane Lounge Chair",
      material: "Oak and Natural Cane",
      color: "Warm Walnut",
      price: 680,
    });
  };

  componentDidMount() {
    console.log("Component mounted");

    // Retrieve product data from the backend here.
  }

  componentDidUpdate(
    _previousProps: Record<string, never>,
    previousState: FurnitureState,
  ) {
    if (previousState.productName !== this.state.productName) {
      console.log("Product changed:", this.state.productName);
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");

    // Clear timers, listeners, or subscriptions here.
  }

  render() {
    const { productName, material, color, price } = this.state;

    return (
      <div>
        <h1>{productName}</h1>

        <p>
          Material: {material} · Color: {color} · Price: $
          {price.toLocaleString()}
        </p>

        <button type="button" onClick={this.changeDetail}>
          Change furniture
        </button>
      </div>
    );
  }
}

export default Test;
