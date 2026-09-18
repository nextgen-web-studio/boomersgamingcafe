import { useState, useEffect } from "react";

export type CartItem = {
  slug: string;
  title: string;
  price: string;
  image: string;
};

let cart: CartItem[] = [];
let listeners: Array<() => void> = [];

try {
  const saved = localStorage.getItem("psgaming_cart");
  if (saved) cart = JSON.parse(saved);
} catch (e) {}

function emit() {
  localStorage.setItem("psgaming_cart", JSON.stringify(cart));
  listeners.forEach(l => l());
}

export const addToCart = (item: CartItem) => {
  if (!cart.find(i => i.slug === item.slug)) {
    cart = [...cart, item];
    emit();
  }
};

export const removeFromCart = (slug: string) => {
  cart = cart.filter(i => i.slug !== slug);
  emit();
};

export const clearCart = () => {
  cart = [];
  emit();
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(cart);
  useEffect(() => {
    const listener = () => setItems(cart);
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  }, []);
  return items;
};
