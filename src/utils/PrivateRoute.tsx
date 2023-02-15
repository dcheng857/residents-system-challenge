import { useSelector } from "react-redux";
import { Navigate, RouteProps, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../features/login/authSlice";

export function PrivateRoute({ children }: RouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  // return children;
}
