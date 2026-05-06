import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  useEffect(() => {
    if (sidebarOpen) setVisible(true);
  }, [sidebarOpen]);

  const handleClose = () => {
    setSidebarOpen(false);
    setTimeout(() => setVisible(false), 200); // match animation
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>

          {/* LEFT */}
          <div className={styles.left}>
            <IconButton
              icon="menu"
              onClick={() => setSidebarOpen(true)}
            />
            <span className={styles.logo}>App Insert Logo+Name</span>
            
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            {!isLoggedIn ? (
              <IconButton
                icon="user"
                onClick={() => navigate("/login")}
              />
            ) : (
              <Dropdown
                trigger={<IconButton icon="user" />}
                items={[
                  {
                    label: user.name,
                    onClick: () => navigate(`/usuario/${user.id}`),
                  },
                  {
                    label: user.role,
                    disabled: true,
                  },
                  "divider",
                  {
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
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={styles.sidebar}
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/clientes" className={location.pathname === "/clientes" ? styles.active : ""} >Clientes</Link>
            <Link to="/creditos" className={location.pathname === "/creditos" ? styles.active : ""} >Creditos</Link>
            <Link to="/etiquetas" className={location.pathname === "/etiquetas" ? styles.active : ""} >Etiquetas</Link>
            <Link to="/usuarios" className={location.pathname === "/usuarios" ? styles.active : ""} >Usuarios</Link>
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