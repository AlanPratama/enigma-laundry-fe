import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./products/productsSlice";
import categoryReducer from "./products/categorySlice";
import cartReducer from "./cart/cartSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		products: productReducer,
		categories: categoryReducer,
		cart: cartReducer,
	},
});
