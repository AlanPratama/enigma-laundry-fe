import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/productsSlice";
import customersReducer from "./customers/customersSlice";
import authReducer from "./auth/authSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    auth: authReducer,
  },
});
