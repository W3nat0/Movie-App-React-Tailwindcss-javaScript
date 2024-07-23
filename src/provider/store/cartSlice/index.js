import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;

export const getCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
{
  /* <Dropdown
  title={
    <span className="flex items-center text-xl hover:text-yellow-500">
      <FaStream className="mr-2" /> Movie
    </span>
  }
  items={items}
/>; */
}
