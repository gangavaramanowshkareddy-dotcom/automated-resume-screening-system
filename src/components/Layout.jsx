import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;