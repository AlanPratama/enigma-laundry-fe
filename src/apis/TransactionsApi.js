import {
  setTransactions,
  setError,
  setIsLoading,
  addTransactions,
} from "../redux/transactions/transactionsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class TransactionApi {
  static async getTransactions() {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/bills/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbmlnbWFjYW1wIiwiZXhwIjoxNzI1NjA3OTc0LCJpYXQiOjE3MjU2MDQzNzQsInVzZXJJZCI6IjI3YjZlZjliLWNlYWItNDcwYS05YTVmLWQ2YzlhMWU5ZDhhOSIsInJvbGUiOiJlbXBsb3llZSIsInNlcnZpY2VzIjpudWxsfQ.lNIyfxCsiVrIdPrCtmK4FE_fbV90WOvgUk-_U0hHjB4",
        },
      });

      store.dispatch(
        setTransactions({
          items: data.data,
          total: data.data.length,
        })
      );
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("TransactionAPI", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createTransactions(transactions) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post(
        "/bills/",
        {
          customerId: transactions.customerId,
          billDetails: [
            {
              product: {
                id: transactions.billDetails[0].product.id,
              },
              qty: +transactions.billDetails[0].qty,
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbmlnbWFjYW1wIiwiZXhwIjoxNzI1NjA3OTc0LCJpYXQiOjE3MjU2MDQzNzQsInVzZXJJZCI6IjI3YjZlZjliLWNlYWItNDcwYS05YTVmLWQ2YzlhMWU5ZDhhOSIsInJvbGUiOiJlbXBsb3llZSIsInNlcnZpY2VzIjpudWxsfQ.lNIyfxCsiVrIdPrCtmK4FE_fbV90WOvgUk-_U0hHjB4",
          },
        }
      );

      store.dispatch(
        addTransactions({
          items: data.data
        })
      );
      // this.getTransactions()
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown Error"
      store.dispatch(setError({ message: errorMessage}));
      throw new Error("TransactionAPI", errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }


}

export default TransactionApi;
