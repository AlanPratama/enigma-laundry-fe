import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { setError, setIsLoading, setUsers } from "../redux/users/usersSlice";
import { addUsers, editUsers } from "../redux/users/usersSlice";

class UserApi {
	static async getUsers() {
		try {
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.get("/users/");

			store.dispatch(
				setUsers({
					items: data.data,
					total: data.data.length,
				})
			);
		} catch (error) {
			store.dispatch(setError(error.message));
			throw new Error("UserApi getUsers", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async createUsers(user) {
		try {
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.post("/users/", {
				...user,
			});

			store.dispatch(
				addUsers({
					items: data.data,
				})
			);
		} catch (error) {
			store.dispatch(setError(error.message));
			throw new Error("UserApi createUser", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async editUser(user) {
		try {
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.put("/users/", {
				...user,
			});

			store.dispatch(
				editUsers({
					items: data.data,
				})
			);
		} catch (error) {
			store.dispatch(setError(error.message));
			throw new Error("UserApi editUser", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async deleteUsers(user) {
		try {
			store.dispatch(setIsLoading(true));
			await axiosInstance.delete("/users/" + user.id);
		} catch (error) {
			store.dispatch(setError(error.message));
			throw new Error("UserApi deleteUser", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}
}

export default UserApi;
