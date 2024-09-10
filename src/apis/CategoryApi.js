import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCategories } from "../redux/products/categorySlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class CategoryApi {
  static async getCategories() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const res = await axiosInstance.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("RES: ", res.data);
      // console.log("LENGTH: ", res.data.length);
      const items = res.data;
      const total = res.data.length;
      store.dispatch(setCategories({ items, total }));
    } catch (error) {
      console.log("CategoryApi: ", error);
    }
  }
}
