import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STUDENT } from '@constants/student';
import type { Product } from '@services/productApi';

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  changeQty: (id: number, quantity: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: product => set(state => {
        const existing = state.items.find(item => item.id === product.id);
        if (existing) {
          return { items: state.items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      remove: id => set(state => ({ items: state.items.filter(item => item.id !== id) })),
      changeQty: (id, quantity) => set(state => ({ items: quantity > 0 ? state.items.map(item => item.id === id ? { ...item, quantity } : item) : state.items.filter(item => item.id !== id) })),
      totalQuantity: () => get().items.reduce((total, item) => total + item.quantity, 0),
      totalAmount: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);