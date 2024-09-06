import { createSlice } from "@reduxjs/toolkit";

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCustomers(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addCustomers(state, action) {
      // state.items = [...state.items, action.payload];
      state.items = [...state.items, action.payload.items];
      state.total += 1;
    },
    editCustomers(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  setIsLoading,
  setCustomers,
  addCustomers,
  editCustomers,
} = customersSlice.actions;

export default customersSlice.reducer;
