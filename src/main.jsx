import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import AuthProvider from "./providers/AuthProvider.jsx";
import ClassProvider from "./providers/ClassProvider.jsx";
import TaskProvider from "./providers/TaskProvider.jsx";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ClassProvider>
          <TaskProvider>
            <Router>
              <>
                <Toaster />
                {/* putting here so the toaster can be seen anywhere */}
                <App />
              </>
            </Router>
          </TaskProvider>
        </ClassProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
