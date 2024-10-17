import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export const PageLayout = ({ children }) => {
  return <>{children}</>;
};

export const DashboardPageLayout = () => {
  return (
    <div className="flex" style={{ overflowX: "clip" }}>
      <Sidebar />
      <main className="w-full flex-shrink">
        <Outlet />
      </main>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.object,
};
