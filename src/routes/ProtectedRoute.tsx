import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store"; // Adjust the path
import Header from "../components/Header"; // Import Header

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore(); // Check if user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header /> {/* Render Header only for logged-in users */}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
