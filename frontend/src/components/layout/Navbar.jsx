import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ICONS } from "../../utils/icontypes";
import Dropdown from "../common/Dropdown";
import IconButton from "../ui/IconButton";
import Modal from "../common/Modal";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { logoutThunk } from "../../store/authSlice";

import styles from "./Navbar.module.css";

export default function Navbar({ user, showToast }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useLockBodyScroll(sidebarOpen);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await dispatch(logoutThunk());

    showToast?.({
      message: "Sesión cerrada",
      type: "success",
    });

    navigate("/login");
  };

  const handleOpen = () => {
    setVisible(true);
    requestAnimationFrame(() => {
      setSidebarOpen(true);
    });
  };

  useEffect(() => {
    if (sidebarOpen) setVisible(true);
  }, [sidebarOpen]);

  const handleClose = () => {
    setSidebarOpen(false);
    setTimeout(() => setVisible(false), 200); 
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>

          {/* LEFT */}
          <div className={styles.left}>
            <IconButton
              icon="menu"
              onClick={handleOpen}
              size="lg"
            />
            <span className={styles.logo}>App Insert Logo+Name</span>
            
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
              <Dropdown
                trigger={<IconButton icon="user" />}
                items={[
                  {
                    icon: ICONS.circleArrow,
                    label: user.name,
                    onClick: () => navigate(`/usuario/${user.id}`),
                  },
                  {
                    icon: ICONS.shieldCheck,
                    label: user.role,
                    disabled: true,
                  },
                  "divider",
                  {
                    icon: ICONS.logout,
                    label: "Logout",
                    variant: "danger",
                    onClick: () => setLogoutOpen(true),
                  },
                ]}
              />
            )}
          </div>

        </div>
      </nav>

      {/* SIDEBAR */}
      {visible && (
        <div className={styles.overlay} onClick={handleClose} >
          <div
            className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarClosed : ""}`}
            onClick={(e) => e.stopPropagation()} 
          >
            <NavLink to="/clientes" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClose}>Clientes</NavLink>
            <NavLink to="/creditos" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClose}>Creditos</NavLink>
            <NavLink to="/etiquetas" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClose}>Etiquetas</NavLink>
            <NavLink to="/usuarios" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClose}>Usuarios</NavLink>
          </div>
        </div>
      )}

      <Modal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Cerrar sesión"
        description="¿Seguro que querés salir?"
        actions={[
            {
                label: "Cancelar",
                onClick: () => setLogoutOpen(false),
            },
            {
                label: "Cerrar Sesión",
                variant: "danger",
                onClick: async () => {
                setLogoutOpen(false);
                await handleLogout();
                },
            },
        ]}
    />
    </>
  );
}