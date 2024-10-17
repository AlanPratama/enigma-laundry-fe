import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./dashboardPage.css";
import "react-toastify/dist/ReactToastify.css";
import ProductApi from "../../apis/ProductsApi";
import TransactionApi from "../../apis/TransactionsApi";
import CustomerApi from "../../apis/CustomersApi";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: itemsProd } = useSelector((state) => state.products);
  const { items: itemsTran } = useSelector((state) => state.transactions);
  const { items: itemsCust } = useSelector((state) => state.customers);

  console.log("itemsTran: ", itemsTran);

  const getProducts = async () => {
    await ProductApi.getProducts();
    await TransactionApi.getTransactions();
    await CustomerApi.getCustomers();
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [recentProducts] = useState([
    { name: "Product A", price: "$25" },
    { name: "Product B", price: "$30" },
    { name: "Product C", price: "$45" },
  ]);

  const [recentTransactions] = useState([
    { id: 1, amount: "$150", status: "Completed" },
    { id: 2, amount: "$200", status: "Pending" },
    { id: 3, amount: "$100", status: "Completed" },
  ]);

  return (
    <div className="dashboard-container m-8">
      <h1 className="dashboard-title">Enigma Laundry Dashboard</h1>
      <h2 className="dashboard-subtitle">Welcome, {user.iss}!</h2>

      {/* Summary section */}
      <div className="summary-cards">
        <div className="summary-card product-card">
          <h3>Total Products</h3>
          <p>{itemsProd?.length}</p>
        </div>
        <div className="summary-card customer-card">
          <h3>Total Customers</h3>
          <p>{itemsCust?.length}</p>
        </div>
        <div className="summary-card transaction-card">
          <h3>Total Transactions</h3>
          <p>{itemsTran?.length}</p>
        </div>
        <div className="summary-card revenue-card">
          <h3>Total Revenue</h3>
          <p>
            Rp{" "}
            {itemsTran
              ?.reduce(
                (curr, item) =>
                  curr +
                  item.billDetails.reduce(
                    (curr, detail) => curr + detail.price * detail.qty,
                    0
                  ),
                0
              )
              .toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Recent section */}
      <div className="recent-section">
        <div className="recent-box">
          <h3>Recent Products</h3>
          <ul>
            {recentProducts.map((product, index) => (
              <li key={index}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="recent-box">
          <h3>Recent Transactions</h3>
          <ul>
            {recentTransactions.map((transaction, index) => (
              <li key={index}>
                Transaction {transaction.id}: {transaction.amount} -{" "}
                {transaction.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
