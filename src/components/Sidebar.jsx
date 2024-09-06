import { useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { useSelector } from "react-redux";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(0);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-4 focus:outline-none fixed top-0 left-0 z-50"
      >
        <ion-icon
          name={isOpen ? "close-outline" : "menu-outline"}
          size="large"
        ></ion-icon>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sticky lg:translate-x-0 lg:ml-0 -ml-64 top-0 left-0 z-40 w-64 min-h-screen border-r-2 bg-gray-50`}
      >
        <div className="h-full overflow-y-auto">
          <button onClick={() => handleNavigate("/")}>
            <img className="mx-auto w-1/2" src={logo} />
          </button>
          <div className="w-3/4 bg-blue-600 lg:pr-4 rounded-full text-white mx-auto justify-center flex flex-row lg:space-x-2">
            <Avatar
              name={user.iss[0].toUpperCase()}
              className="my-auto font-bold lg:block hidden"
              isBordered
              color="primary"
            />
            <div className="flex flex-col">
              <p className="text-center font-semibold">{user.iss}</p>
              <p className="text-center font-semibold">{user.role}</p>
            </div>
          </div>
          <hr className="my-4" />
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
                <span className="ms-3 text-medium font-semibold">
                  Dashboard
                </span>
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
                <span className="ms-3 text-medium font-semibold">
                  Customers
                </span>
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
                <span className="ms-3 text-medium font-semibold">Bills</span>
              </Button>
            </li>
            <div className="absolute bottom-0">
              <li className="sm:w-40 w-52 mx-auto py-4">
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
            </div>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
