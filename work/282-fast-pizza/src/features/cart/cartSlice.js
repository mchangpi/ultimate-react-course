import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   cart: [],
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart' /* A name, used in action types */,
  initialState,
  reducers: {
    addItem(state, action) {
      //    state.cart.push(action.payload); // mutate the cart
      state.cart = [...state.cart, action.payload]; // ReactJs way
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incItemQuantity(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.totalPrice + item.unitPrice,
          };
        } else {
          return item;
        }
      });
    },
    decItemQuantity(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.totalPrice - item.unitPrice,
          };
        } else {
          return item;
        }
      });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
