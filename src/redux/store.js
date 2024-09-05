import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/productsSlice";
import authReducer from "./auth/authSlice";

export default configureStore({
	reducer: {
		products: productsReducer,
		auth: authReducer,
	},
});
