import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import EnhancedDashboard from "./pages/EnhancedDashboard";
import Games from "./pages/Games";
import Friends from "./pages/Friends";
import CalendarPage from "./pages/CalendarPage";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import SearchPage from "./pages/SearchPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import InvitePage from "./pages/InvitePage";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-16 mb-16 sm:mb-0 sm:ml-0 p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<EnhancedDashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/invite/:userId" element={<InvitePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;