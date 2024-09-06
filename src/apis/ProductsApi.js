import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { addProduct, editProduct, setError, setIsLoading, setProducts } from "../redux/products/productsSlice";
import { toast } from "react-toastify";

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
			store.dispatch(setError(error.message));
			toast.error("Produk Gagal Ditampilkan!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
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
			toast.success("Produk Berhasil Dibuat!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
		} catch (error) {
			store.dispatch(setError(error));
			toast.error("Produk Gagal Dibuat!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
			console.log("ProductApi createProduct", error.message);
			
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async updateProduct(productData) {
		try {
			store.dispatch(setIsLoading(true));
			const res = await axiosInstance.put(`/products/`, {...productData})
			store.dispatch(editProduct(res.data.data))
			toast.success("Produk Berhasil Diubah!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
		} catch (error) {
			store.dispatch(setError(error));
			toast.error("Produk Gagal Diubah!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async deleteProduct(productId) {
		try {
			store.dispatch(setIsLoading(true));
			await axiosInstance.delete(`/products/${productId}`)
			toast.success("Produk Berhasil Dihapus!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
		} catch (error) {
			store.dispatch(setError(error));
			toast.error("Produk Gagal Dihapus!", {
				position: "top-center",
				autoClose: 2500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			  });
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

}

export default ProductApi;
