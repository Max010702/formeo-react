import { useCallback, useEffect, useState } from "react";
import type { CartItem } from "../lib/types/search";

const getInitialCart = (): CartItem[] => {
  try {
    const cartJson = localStorage.getItem("cartData");

    if (!cartJson) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(cartJson);

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

const useBasket = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cartData");
      return;
    }

    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);

  const onAdd = useCallback((input: CartItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item._id === input._id);

      if (!existingItem) {
        return [
          ...currentItems,
          {
            ...input,
            quantity: input.quantity || 1,
          },
        ];
      }

      return currentItems.map((item) =>
        item._id === input._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    });
  }, []);

  const onRemove = useCallback((input: CartItem) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item._id === input._id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const onDelete = useCallback((input: CartItem) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== input._id),
    );
  }, []);

  const onDeleteAll = useCallback(() => {
    setCartItems([]);
  }, []);

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
