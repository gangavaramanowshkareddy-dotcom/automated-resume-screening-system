import {
    LayoutDashboard,
    BriefcaseBusiness,
    ScanSearch,
    Users,
    BarChart3,
    Plus,
    Settings,
    CircleHelp,
    LogOut,
  } from "lucide-react";
  import { NavLink, useNavigate } from "react-router-dom";
  
  function Sidebar() {
    const navigate = useNavigate();
  
    const menuItems = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Jobs",
        path: "/jobs",
        icon: BriefcaseBusiness,
      },
      {
        name: "Screening",
        path: "/screening",
        icon: ScanSearch,
      },
      {
        name: "Candidates",
        path: "/candidates",
        icon: Users,
      },
      {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
    ];
  
    const handleLogout = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("role");
      navigate("/");
    };
  
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <ScanSearch size={20} />
          </div>
  
          <div>
            <h2>SmartScreen AI</h2>
            <span>Automated Screening</span>
          </div>
        </div>
  
        <button
          className="new-screening-button"
          onClick={() => navigate("/screening")}
        >
          <Plus size={17} />
          New Screening
        </button>
  
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
  
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
  
        <div className="sidebar-bottom">
          <button
            className="sidebar-link sidebar-button"
            onClick={() => alert("Settings will be added later.")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
  
          <button
            className="sidebar-link sidebar-button"
            onClick={() => alert("Help Center will be added later.")}
          >
            <CircleHelp size={18} />
            <span>Help Center</span>
          </button>
  
          <button
            className="sidebar-link sidebar-button logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    );
  }
  
  export default Sidebar;