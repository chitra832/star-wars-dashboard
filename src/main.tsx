import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Login from "./pages/auth/Login";
import Landing from "./pages/landing/Landing";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import PersonDetail from "./components/PersonDetail";
import FilmDetail from "./components/FilmDetail";
import VehicleDetail from "./components/VehicleDetail";
import StarshipDetail from "./components/StarshipDetail";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> }, // Default page is Landing
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "person/:id", element: <PersonDetail /> },
          { path: "film/:id", element: <FilmDetail /> },
          { path: "vehicle/:id", element: <VehicleDetail /> },  // New route
          { path: "starship/:id", element: <StarshipDetail /> }, // New route
        ],
      },
      { path: "*", element: <Landing /> }, // Redirect unknown routes to Landing
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
