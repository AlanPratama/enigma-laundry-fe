import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const isFromLogin = location.state?.from === "/login";

  useEffect(() => {
    if (isFromLogin)
      toast.info(`Selamat Datang ${user.iss}!`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  }, [isFromLogin, user.iss]);

  return (
    <div>
      <h1>DashboardPage</h1>
      <p>hello {user.iss}</p>

    </div>
  );
};

export default DashboardPage;
