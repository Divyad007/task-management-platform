import { Navigate } from "react-router-dom";

interface protectedRouteprops {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: protectedRouteprops) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
