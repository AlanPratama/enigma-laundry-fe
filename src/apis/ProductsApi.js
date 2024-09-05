import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { addProduct, editProduct, setError, setIsLoading, setProducts } from "../redux/products/productsSlice";

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

	static async createProduct(productData) {
		try {
			store.dispatch(setIsLoading(true));
			const res = await axiosInstance.post("/products/", {...productData})
			store.dispatch(addProduct(res.data.data))
		} catch (error) {
			store.dispatch(setError(error));
			throw new Error("ProductApi createProduct", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async updateProduct(productData) {
		try {
			store.dispatch(setIsLoading(true));
			const res = await axiosInstance.put(`/products/`, {...productData})
			store.dispatch(editProduct(res.data.data))
		} catch (error) {
			store.dispatch(setError(error));
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async deleteProduct(productId) {
		try {
			store.dispatch(setIsLoading(true));
			await axiosInstance.delete(`/products/${productId}`)
			this.getProducts()
		} catch (error) {
			store.dispatch(setError(error));
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

}

export default ProductApi;
