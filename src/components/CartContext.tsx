import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Product } from '../types';

interface CartItem extends Product {
  foto: string | null;
  quantidade: number;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext({} as CartContextData);

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantidade: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.preco * item.quantidade;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);