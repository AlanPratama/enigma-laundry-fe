import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import {
  setError,
  setIsLoading,
  setCustomers,
} from "../redux/customers/customersSlice";
import { addCustomers } from "../redux/customers/customersSlice";
import { editCustomers } from "../redux/customers/customersSlice";

class CustomerApi {
  static async getCustomers() {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/customers/");

      store.dispatch(
        setCustomers({
          items: data.data,
          total: data.data.length,
        })
      );
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("CustomerApi getCustomers", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createCustomers(customers) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post("/customers/", {
        ...customers,
      });

      store.dispatch(
        addCustomers({
          items: data.data,
        })
      );
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("CustomerApi createCustomer", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async editCustomer(customers) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put("/customers/", {
        ...customers,
      });

      store.dispatch(
        editCustomers({
          items: data.data,
        })
      );
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("CustomerApi editCustomer", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deleteCustomers(customers) {
    try {
      store.dispatch(setIsLoading(true));
      await axiosInstance.delete("/customers/" + customers.id);
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("CustomerApi deleteCustomer", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default CustomerApi;
