import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  /*
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
  */
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
            totalPrice: item.quantity * item.unitPrice,
          };
        } else {
          return item;
        }
      });
    },
    decItemQuantity(state, action) {
      /* if (item.quantity < 1) cartSlice.caseReducers.deleteItem(state, action); */
      state.cart = state.cart
        .map((item) => {
          if (item.pizzaId === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.quantity * item.unitPrice,
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0);
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

/* selector functions */
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((accu, cur) => accu + cur.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((accu, cur) => accu + cur.totalPrice, 0);

export const getCurQuantityById = (id) => (state) => {
  /* returns the first element in the array that satisfies the testing function */
  const selectedItem = state.cart.cart.find((item) => item.pizzaId === id);
  if (selectedItem) return selectedItem.quantity;
  else return 0;
};
