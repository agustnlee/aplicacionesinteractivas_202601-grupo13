import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") ?? "null");

    if (!token) return <Navigate to="/login" replace />;
    if (user?.rol !== "ADMIN") return <Navigate to="/" replace />;

    return <Outlet />;
}