import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </QueryClientProvider>
  </AuthProvider>
);
