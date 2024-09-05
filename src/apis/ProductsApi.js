import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { setError, setIsLoading, setProducts } from "../redux/products/productsSlice";

class ProductApi {
	static async getProducts() {
		try {
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.get("/products/");

			store.dispatch(
				setProducts({
					items: data.data,
					total: data.data.length,
				})
			);
		} catch (error) {
			store.dispatch(setError(error));
			throw new Error("ProductApi getProducts", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}
}

export default ProductApi;
