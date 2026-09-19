import { useState, useEffect } from "react";

export type WishlistItem = {
  slug: string;
};

let wishlist: WishlistItem[] = [];
let listeners: Array<() => void> = [];

try {
  const saved = localStorage.getItem("psgaming_wishlist");
  if (saved) wishlist = JSON.parse(saved);
} catch (e) {}

function emit() {
  localStorage.setItem("psgaming_wishlist", JSON.stringify(wishlist));
  listeners.forEach(l => l());
}

export const toggleWishlist = (slug: string) => {
  if (wishlist.find(i => i.slug === slug)) {
    wishlist = wishlist.filter(i => i.slug !== slug);
  } else {
    wishlist = [...wishlist, { slug }];
  }
  emit();
};

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>(wishlist);
  useEffect(() => {
    const listener = () => setItems(wishlist);
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  }, []);
  return items;
};
