import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(0);
  };

  return (
    <aside className="sm:block sticky top-0 left-0 z-40 w-64 h-screen hidden border-r-2">
      <div className="h-full overflow-y-auto bg-gray-50">
        <button onClick={() => handleNavigate("/")}>
          <img className="mx-auto w-3/4" src={logo} />
        </button>
        <ul className="space-y-2 font-medium mx-4">
          <li>
            <Button
              onClick={() => handleNavigate("/dashboard")}
              variant="light"
              color="primary"
              className={`${
                location.pathname == "/dashboard" && "bg-blue-500 text-white"
              } w-full justify-start`}
              radius="sm"
              startContent={<ion-icon name="home-outline"></ion-icon>}
            >
              <span className="ms-3 text-medium font-semibold">Dashboard</span>
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleNavigate("/dashboard/products")}
              variant="light"
              color="primary"
              className={`${
                location.pathname == "/dashboard/products" &&
                "bg-blue-500 text-white"
              } w-full justify-start`}
              radius="sm"
              startContent={<ion-icon name="pricetags-outline"></ion-icon>}
            >
              <span className="ms-3 text-medium font-semibold">Products</span>
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleNavigate("/dashboard/customers")}
              variant="light"
              color="primary"
              className={`${
                location.pathname == "/dashboard/customers" &&
                "bg-blue-500 text-white"
              } w-full justify-start`}
              radius="sm"
              startContent={<ion-icon name="people-outline"></ion-icon>}
            >
              <span className="ms-3 text-medium font-semibold">Customers</span>
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleNavigate("/dashboard/bills")}
              variant="light"
              color="primary"
              className={`${
                location.pathname == "/dashboard/bills" &&
                "bg-blue-500 text-white"
              } w-full justify-start`}
              radius="sm"
              startContent={<ion-icon name="receipt-outline"></ion-icon>}
            >
              <span className="ms-3 text-medium font-semibold">
                Bills
              </span>
            </Button>
          </li>
          <hr />
          <li>
            <Button
              onClick={() => handleLogout()}
              variant="light"
              color="danger"
              className="w-full justify-start"
              radius="sm"
              startContent={<ion-icon name="log-out-outline"></ion-icon>}
            >
              <span className="ms-3 text-medium font-semibold">Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
