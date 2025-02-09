import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { queryClient } from "./lib/queryClient";
import { Switch, Route } from "wouter";
import { ProtectedRoute } from "./lib/protected-route";
import { Toaster } from "@/components/ui/toaster";

import Dashboard from "@/pages/dashboard";
import Inventory from "@/pages/inventory";
import Reports from "@/pages/reports";
import Tasks from "@/pages/tasks";
import Attendance from "@/pages/attendance";
import Payroll from "@/pages/payroll";
import Invoices from "@/pages/invoices";
import Departments from "@/pages/departments";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute
        path="/inventory"
        component={Inventory}
        requiredRoles={["super_admin", "admin"]}
      />
      <ProtectedRoute
        path="/reports"
        component={Reports}
        requiredRoles={["super_admin", "admin"]}
      />
      <ProtectedRoute
        path="/tasks"
        component={Tasks}
        requiredRoles={["super_admin", "admin"]}
      />
      <ProtectedRoute
        path="/attendance"
        component={Attendance}
        requiredRoles={["super_admin", "admin"]}
      />
      <ProtectedRoute
        path="/payroll"
        component={Payroll}
        requiredRoles={["super_admin", "admin"]}
      />
      <ProtectedRoute
        path="/invoices"
        component={Invoices}
        requiredRoles={["super_admin", "admin"]}
      />
      <ProtectedRoute
        path="/departments"
        component={Departments}
        requiredRoles={["super_admin"]}
      />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;