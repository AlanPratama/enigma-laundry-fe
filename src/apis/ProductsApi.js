import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { setError, setIsLoading, setProducts } from "../redux/products/productsSlice";

class ProductApi {
	static async getProducts() {
		try {
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.get("/products/", {
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbmlnbWFjYW1wIiwiZXhwIjoxNzI1NTQwMjkxLCJpYXQiOjE3MjU1MzY2OTEsInVzZXJJZCI6ImRhNGFkODhiLTk5YjItNGJkZi04Y2M3LTU2M2Q0NjFkNTBlZSIsInJvbGUiOiJhZG1pbiIsInNlcnZpY2VzIjpudWxsfQ.Fzkdit4PlJAN5x7kClozSlb_5DV4eOBT7lFuhyfoMr4`
				}
			});
			console.log("dataass: ", data);
			
			store.dispatch(
				setProducts({
					items: data.data,
					// total: data.data.length,
					total: 1000,
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
