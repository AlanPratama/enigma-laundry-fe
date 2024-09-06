import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setTransactions(state, action) {
      const {items, total} = action.payload
      state.items = items;
      state.total = total;
    },
    addTransactions(state, action) {
      console.log(action);
      
      state.items = [...state.items, action.payload.items]
      state.total += 1
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
})

export const { setError, setIsLoading, setTransactions, addTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer

