import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import ViewAllSubmissions from "./ViewAllSubmissions.jsx";
import Dashboard from "./Dashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/home",
    element:<h1>Inside home</h1>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },{
    path:"/allSubmission",
    element:<ViewAllSubmissions/>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
