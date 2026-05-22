import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "../ui/IconButton";
import Modal from "../common/Modal";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { logout } from "../../api/authApi";
import styles from "./Navbar.module.css";

export default function Navbar({ showToast }) {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") ?? "null");

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [visible,     setVisible]     = useState(false);
    const [logoutOpen,  setLogoutOpen]  = useState(false);

    useLockBodyScroll(sidebarOpen);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (_) {}
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        showToast?.({ message: "Sesión cerrada", type: "success" });
        navigate("/login");
    };

    const handleOpen = () => {
        setVisible(true);
        requestAnimationFrame(() => setSidebarOpen(true));
    };

    const handleClose = () => {
        setSidebarOpen(false);
        setTimeout(() => setVisible(false), 200);
    };

    useEffect(() => {
        if (sidebarOpen) setVisible(true);
    }, [sidebarOpen]);

    const linkClass = ({ isActive }) => isActive ? styles.active : "";

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.container}>

                    <div className={styles.left}>
                        <IconButton icon="menu" onClick={handleOpen} size="lg" />
                        <span className={styles.logo}>App Insert Logo+Name</span>
                    </div>

                    <div className={styles.right}>
                        {user && (
                            <div className={styles.userBlock}>
                                <span className={styles.userName}>
                                    {user.nombre ?? "Operador"}
                                </span>
                                <span className={styles.roleLabel}>{user.rol}</span>
                            </div>
                        )}
                        <IconButton icon="logout" size="lg" onClick={() => setLogoutOpen(true)} />
                    </div>

                </div>
            </nav>

            {visible && (
                <div className={styles.overlay} onClick={handleClose}>
                    <div
                        className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarClosed : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <NavLink to="/clientes" className={linkClass} onClick={handleClose}>Clientes</NavLink>
                        <NavLink to="/creditos"  className={linkClass} onClick={handleClose}>Créditos</NavLink>
                        <NavLink to="/etiquetas" className={linkClass} onClick={handleClose}>Etiquetas</NavLink>
                        <NavLink to="/usuarios"  className={linkClass} onClick={handleClose}>Usuarios</NavLink>
                    </div>
                </div>
            )}

            <Modal
                isOpen={logoutOpen}
                onClose={() => setLogoutOpen(false)}
                title="Cerrar sesión"
                description="¿Seguro que querés salir?"
                actions={[{
                    label: "Cerrar Sesión",
                    variant: "danger",
                    onClick: async () => {
                        setLogoutOpen(false);
                        await handleLogout();
                    },
                }]}
            />
        </>
    );
}