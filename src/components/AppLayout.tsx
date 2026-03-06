import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar userRole={user.role} userName={user.name} onLogout={handleLogout} />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
