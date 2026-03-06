import { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";

// Simple session-based auth (mock, will be replaced with real auth later)
const AUTH_KEY = "syarikat_auth";

export function useAuth() {
  const [user, setUser] = useState<{ name: string; email: string; role: 'admin' | 'member' } | null>(() => {
    const saved = sessionStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: { name: string; email: string; role: 'admin' | 'member' }) => {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return { user, isAuthenticated: !!user, login, logout };
}

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
