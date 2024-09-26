import React, { useEffect, useMemo } from 'react';

import { Product } from 'types';

type CartObject = {
  product: Product;
  quantity: number;
};

type Context = {
  cart: CartObject[];
  loading: boolean;
  addToCart: (product: Product) => void;
  setCount: (productId: string, count: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export const CartContext = React.createContext<Context>({
  cart: [],
  loading: true,
  addToCart: () => {},
  setCount: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCartContext = () => React.useContext(CartContext);

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [cart, setCart] = React.useState<CartObject[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartFromLocalStorage);
    setLoading(false);
  }, []);

  const addToCart = (product: Product) => {
    const newCart = [...cart, { product, quantity: 1 }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const setCount = (productId: string, count: number) => {
    const newCart = cart.map((item) => (item.product._id === productId ? { ...item, quantity: count } : item));
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product._id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const value = useMemo(
    () => ({
      cart,
      loading,
      addToCart,
      setCount,
      removeFromCart,
      clearCart,
    }),
    [cart, loading],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
