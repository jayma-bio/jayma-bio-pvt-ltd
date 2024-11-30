import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Products } from "@/types/products-related-types";
import { toast } from "sonner";

interface CartItem extends Products {
  id: string;
}

 interface WishlistStore {
  items: CartItem[];
  addItem: (data: Products) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  checkItem: (id: string) => boolean;
}

const useWishlist = create(
  persist<WishlistStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Products) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.info("Item already in wishlist");
          return;
        }

        set({ items: [...currentItems, { ...data, qty: 1 }] });
        toast.success("Item added to wishlist");
      },
      removeItem: (id: string) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({ items: updatedItems });
        toast.success("Item removed from wishlist");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from wishlist");
      },
      checkItem: (id: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        return existingItem ? true : false;
      },
    }),
    {
      name: "favourite-products",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlist;
