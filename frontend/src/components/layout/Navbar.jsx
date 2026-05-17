import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, Menu, X } from "lucide-react";
import { logoutThunk } from "../../store/authSlice";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = String(user?.rol ?? "").toUpperCase() === "ADMIN";

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/auth/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  const adminLinkClass = ({ isActive }) =>
    isActive 
      ? `${styles.navLink} ${styles.adminLink} ${styles.adminLinkActive}` 
      : `${styles.navLink} ${styles.adminLink}`;

  return (
    <nav className={styles.bar}>
      <div className={styles.inner}>
        
        {/* Bloque Izquierdo: Contiene Logo y Enlaces de Navegación */}
        <div className={styles.leftSection}>
          <Logo />
          
          {/* Menú de navegación de escritorio */}
          <div className={styles.centerNav}>
            <NavLink to="/clientes" className={linkClass}>
              Clientes
            </NavLink>
            <NavLink to="/creditos" className={linkClass}>
              Créditos
            </NavLink>
            
            {/* Renderizado condicional exclusivo para el Administrador */}
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
        </div>

        {/* Bloque Derecho: Información de perfil y botón de salida */}
        <div className={styles.rightSection}>
          {user && (
            <div className={styles.userBlock}>
              <span className={styles.userName}>{user.nombre ?? user.name ?? "Operador"}</span>
              <span className={styles.roleLabel}>{user.rol}</span>
            </div>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn} title="Cerrar Sesión">
            <LogOut className={styles.logoutIcon} />
          </button>
        </div>

      </div>
    </nav>
  );
}