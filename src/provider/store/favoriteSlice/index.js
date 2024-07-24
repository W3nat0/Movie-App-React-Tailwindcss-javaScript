import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearFavorite: (state) => {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorite } =
  favoriteSlice.actions;

export const getFavoriteItems = (state) => state.favorite.items;

export default favoriteSlice.reducer;
