import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ICONS } from "../../utils/icontypes";
import Dropdown from "../common/Dropdown";
import IconButton from "../ui/IconButton";
import Modal from "../common/Modal";
import Logo from "./Logo";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { logout } from "../../api/authApi";
import styles from "./Navbar.module.css";

export default function Navbar({ showToast }) {
    const navigate = useNavigate();

    const user        = JSON.parse(localStorage.getItem("user") ?? "null");
    const isLoggedIn  = !!user;

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

                    {/* LEFT */}
                    <div className={styles.left}>
                        {isLoggedIn && (
                            <IconButton icon="menu" onClick={handleOpen} size="lg" />
                        )}
                        <div className={styles.logo}> <Logo /> </div>
                    </div>

                    {/* RIGHT */}
                    <div className={styles.right}>
                        {!isLoggedIn ? (
                            <IconButton
                                icon="login"
                                onClick={() => navigate("/login")}
                                size="lg"
                            />
                        ) : (
                            <>
                                <span className={styles.userName}>
                                    {user.nombre ?? "Operador"}
                                </span>

                                <Dropdown
                                    trigger={<IconButton icon="user" />}
                                    items={[
                                        {
                                            icon: ICONS.circleArrow,
                                            label: "Mi perfil",
                                            onClick: () => navigate(`/usuarios/${user.id}`),
                                        },
                                        {
                                            icon: ICONS.shieldCheck,
                                            label: user.rol,
                                            disabled: true,
                                        },
                                        "divider",
                                        {
                                            icon: ICONS.logout,
                                            label: "Cerrar sesión",
                                            variant: "danger",
                                            onClick: () => setLogoutOpen(true),
                                        },
                                    ]}
                                />
                            </>
                        )}
                    </div>

                </div>
            </nav>

            {/* SIDEBAR — solo si autenticado */}
            {isLoggedIn && visible && (
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