import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "../ui/IconButton";
import Modal from "../common/Modal";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { logoutThunk } from "../../store/authSlice";
import { useToast } from "../../hooks/useToast";
import Logo from "./Logo";

import styles from "./Navbar.module.css";

const linkClass = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

const adminLinkClass = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 text-sm font-semibold transition-colors text-red-600",
    isActive
      ? "bg-red-50 ring-1 ring-red-100"
      : "hover:bg-red-50 hover:text-red-700",
  ].join(" ");

export default function Navbar({ user: userProp, showToast: showToastProp }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const authUser = useSelector((state) => state.auth.user);
  const { showToast: contextShowToast } = useToast();

  const user = userProp ?? authUser ?? null;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useLockBodyScroll(sidebarOpen);

  const isLoggedIn = !!user;
  const isAdmin = String(user?.rol ?? "").toUpperCase() === "ADMIN";

  const notify = (message, type = "info") => {
    if (showToastProp) {
      showToastProp({ message, type });
    } else {
      contextShowToast(message, type);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());

    notify("Sesión cerrada", "success");

    navigate("/auth/login");
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

  useEffect(() => {
    setSidebarOpen(false);
    const t = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const handleClose = () => {
    setSidebarOpen(false);
    setTimeout(() => setVisible(false), 200);
  };

  const displayName = user?.nombre ?? user?.name ?? "Usuario";

  return (
    <>
      <nav className="sticky top-0 z-[100] border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:gap-4 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="md:hidden">
              <IconButton
                icon="menu"
                onClick={handleOpen}
                size="lg"
                title="Abrir menú"
              />
            </div>
            <Logo className="min-w-0 shrink" />
          </div>

          <div className="hidden min-w-0 flex-[2] justify-center gap-1 md:flex lg:gap-2">
            <NavLink to="/clientes" className={linkClass}>
              Clientes
            </NavLink>
            <NavLink to="/creditos" className={linkClass}>
              Créditos
            </NavLink>
            {isAdmin && (
              <>
                <NavLink to="/etiquetas" className={adminLinkClass}>
                  Etiquetas
                </NavLink>
                <NavLink to="/usuarios" className={adminLinkClass}>
                  Usuarios
                </NavLink>
              </>
            )}
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
            {!isLoggedIn ? (
              <IconButton
                icon="login"
                onClick={() => navigate("/auth/login")}
                size="lg"
                title="Iniciar sesión"
              />
            ) : (
              <div className="flex max-w-[min(100%,14rem)] items-center gap-2 sm:max-w-xs sm:gap-3">
                <span
                  className="truncate text-right text-sm font-medium text-slate-800"
                  title={displayName}
                >
                  {displayName}
                </span>
                <IconButton
                  icon="logout"
                  onClick={() => setLogoutOpen(true)}
                  variant="danger"
                  title="Cerrar sesión"
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {visible && (
        <div className={styles.overlay} onClick={handleClose}>
          <div
            className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarClosed : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <NavLink
              to="/clientes"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={handleClose}
            >
              Clientes
            </NavLink>
            <NavLink
              to="/creditos"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={handleClose}
            >
              Créditos
            </NavLink>
            {isAdmin && (
              <>
                <NavLink
                  to="/etiquetas"
                  className={({ isActive }) =>
                    `${isActive ? styles.active : ""} text-red-600 font-semibold`
                  }
                  onClick={handleClose}
                >
                  Etiquetas
                </NavLink>
                <NavLink
                  to="/usuarios"
                  className={({ isActive }) =>
                    `${isActive ? styles.active : ""} text-red-600 font-semibold`
                  }
                  onClick={handleClose}
                >
                  Usuarios
                </NavLink>
              </>
            )}
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
