import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addUsers(state, action) {
      // state.items = [...state.items, action.payload];
      state.items = [...state.items, action.payload.items];
      state.total += 1;
    },
    editUsers(state, action) {
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
  setUsers,
  addUsers,
  editUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
