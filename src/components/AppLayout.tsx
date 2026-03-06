import { Outlet, Navigate, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";

// Mock auth state - will be replaced with real auth
const useMockAuth = () => ({
  isAuthenticated: true,
  user: { id: '1', name: 'สมชาย', email: 'somchai@family.com', role: 'admin' as const },
  logout: () => {},
});

export default function AppLayout() {
  const { isAuthenticated, user, logout } = useMockAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar userRole={user.role} userName={user.name} onLogout={logout} />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
