import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/productsSlice";
import customersReducer from "./customers/customersSlice";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transactions/transactionsSlice"
import usersReducer from "./users/usersSlice";

export default configureStore({
	reducer: {
		products: productsReducer,
		auth: authReducer,
    	customers: customersReducer,
		transactions: transactionReducer,
    	users: usersReducer
	},
});
