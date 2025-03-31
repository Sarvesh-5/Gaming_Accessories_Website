import { create } from 'zustand';

const useStore = create((set, get) => ({
  wishlist: [],
  cart: [],

  // Wishlist
  addToWishlist: (product) => {
    const exists = get().wishlist.some(item => item.id === product.id);
    if (!exists) {
      set(state => ({ wishlist: [...state.wishlist, product] }));
    }
  },
  removeFromWishlist: (id) => {
    set(state => ({ wishlist: state.wishlist.filter(item => item.id !== id) }));
  },
  toggleWishlist: (product) => {
    const exists = get().wishlist.some(item => item.id === product.id);
    if (exists) {
      get().removeFromWishlist(product.id);
    } else {
      get().addToWishlist(product);
    }
  },

  // Cart
  addToCart: (product) => {
    const cart = get().cart;
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    set(state => ({ cart: state.cart.filter(item => item.id !== id) }));
  },

  increaseQty: (id) => {
    set(state => ({
      cart: state.cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decreaseQty: (id) => {
    set(state => ({
      cart: state.cart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0),
    }));
  },

  // ✅ Clear cart after payment success
  clearCart: () => {
    set({ cart: [] });
  },
}));

export default useStore;
