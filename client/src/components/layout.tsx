import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Package, 
  BarChart, 
  LogOut,
  Building2,
  ClipboardList,
  Users,
  Receipt,
  Clock,
  DollarSign
} from "lucide-react";
import { ThemeCustomizer } from "./theme-customizer";
import { SettingsCustomizer } from "./settings-customizer";
import { useSettingsConfig } from "@/lib/settings-config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();
  const { features } = useSettingsConfig();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ["super_admin", "admin", "employee"] },
    { name: 'Inventory', href: '/inventory', icon: Package, roles: ["super_admin", "admin"] },
    { name: 'Tasks', href: '/tasks', icon: ClipboardList, roles: ["super_admin", "admin", "employee"] },
    { name: 'Attendance', href: '/attendance', icon: Clock, roles: ["super_admin", "admin"], enabled: features.attendance },
    { name: 'Payroll', href: '/payroll', icon: DollarSign, roles: ["super_admin", "admin"], enabled: features.payroll },
    { name: 'Invoices', href: '/invoices', icon: Receipt, roles: ["super_admin", "admin"], enabled: features.invoices },
    { name: 'Reports', href: '/reports', icon: BarChart, roles: ["super_admin", "admin"], enabled: features.reports },
    { name: 'Departments', href: '/departments', icon: Users, roles: ["super_admin"], enabled: features.departments },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '') && 
    (item.enabled === undefined || item.enabled)
  );

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-sidebar border-r">
        <div className="h-16 flex items-center gap-2 px-4 border-b">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold text-lg">Business System</span>
        </div>

        <nav className="p-4 space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-4 px-4 py-2 bg-muted rounded-lg">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeCustomizer />
            <SettingsCustomizer />
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}