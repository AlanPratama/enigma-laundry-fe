import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/productsSlice";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transactions/transactionsSlice"

export default configureStore({
	reducer: {
		products: productsReducer,
		auth: authReducer,
		transactions: transactionReducer
	},
});
