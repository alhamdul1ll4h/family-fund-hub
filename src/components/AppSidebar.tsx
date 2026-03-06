import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Wallet, HandCoins, PiggyBank, Users, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
  { to: "/fund", icon: Wallet, label: "กองทุนส่วนรวม" },
  { to: "/loans", icon: HandCoins, label: "ยืม-คืนเงิน" },
  { to: "/savings", icon: PiggyBank, label: "เงินออมส่วนตัว" },
  { to: "/members", icon: Users, label: "สมาชิก", adminOnly: true },
];

interface AppSidebarProps {
  userRole?: 'admin' | 'member';
  userName?: string;
  onLogout?: () => void;
}

export default function AppSidebar({ userRole = 'member', userName = 'สมาชิก', onLogout }: AppSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const filteredItems = navItems.filter(item => !item.adminOnly || userRole === 'admin');

  const sidebarContent = (
    <div className="flex flex-col h-full gradient-sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
            <Wallet className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-sidebar-foreground text-lg leading-tight">Syarikat</h1>
            <p className="text-xs text-sidebar-foreground/60">Family Fund</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              location.pathname === item.to
                ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">{userRole}</p>
          </div>
          <button onClick={onLogout} className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen w-64 z-40 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
}
