import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0, 
    isLoading: false,
    error: null,
    paging: {}, 
  },
  reducers: {
    setProducts(state, action) {
      const { items, paging } = action.payload;
      state.items = items;
      state.total = paging.totalElement; 
      state.paging = paging; 
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setError, setIsLoading, setProducts } = productsSlice.actions;

export default productsSlice.reducer;
