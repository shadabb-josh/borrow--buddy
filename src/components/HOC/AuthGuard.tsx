import { Navigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default AuthGuard;
