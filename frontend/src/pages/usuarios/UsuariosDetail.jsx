import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";
import ModalEditarUsuario from "../../components/usuarios/ModalEditarUsuario";
import ModalAlterarEstado from "../../components/usuarios/ModalAlterarEstado";
import ModalCambiarPassword from "../../components/usuarios/ModalCambiarPassword";
import { fetchUsuarioByIdThunk, editarUsuarioThunk, cambiarEstadoUsuarioThunk, resetearPasswordThunk, clearUsuarioSeleccionado, } from "../../store/usuarioSlice";
import { ICONS } from "../../utils/icontypes";
import styles from "../PagesDetail.module.css";


import { logout } from "../../api/authApi";


const ROL_BADGE = {
    ADMIN:    { clase: "badge badge-danger",  icono: "shieldCheck"  },
    ANALISTA: { clase: "badge badge-info",    icono: "clipboardPen" },
    COBRADOR: { clase: "badge badge-neutral", icono: "atSign"       },
};

export default function UsuariosDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const dispatch = useDispatch();
    const { usuarioSeleccionado: usuario, loading: isLoading, error } = useSelector(state => state.usuarios);

    const [modalEditar,   setModalEditar]   = useState(false);
    const [modalEstado,   setModalEstado]   = useState(false);
    const [modalPassword, setModalPassword] = useState(false);

    useEffect(() => {
        if (!id || id === "undefined") return;
        dispatch(fetchUsuarioByIdThunk(id))
            .unwrap()
            .catch(() => {
                showToast("Usuario no encontrado", "warning");
                navigate("/usuarios", { replace: true });
            });

        return () => { dispatch(clearUsuarioSeleccionado()); };
    }, [id, dispatch]);

    const handleEditarUsuario = async ({ nombre, rol }) => {
        try {
            await dispatch(editarUsuarioThunk({
                id,
                data: { nombre, rol, estado: usuario.estado },
            })).unwrap();
            showToast("Usuario actualizado correctamente", "success");
            setModalEditar(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al editar usuario", "error");
        }
    };

    const handleAlterarEstado = async () => {
        try {
            await dispatch(cambiarEstadoUsuarioThunk(id)).unwrap();
            const userActual = JSON.parse(localStorage.getItem("user") ?? "null");

            if (userActual?.id === usuario.id && usuario.estado) {
                try { await logout(); } catch (_) {}
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                showToast("Tu usuario fue desactivado. Sesión cerrada.", "warning");
                navigate("/login", { replace: true });
                return;
            }
            showToast(usuario.estado ? "Usuario desactivado" : "Usuario activado", "success");
            setModalEstado(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar estado", "error");
        }
    };

    const handleCambiarPassword = async (password) => {
        try {
            await dispatch(resetearPasswordThunk({ id, password })).unwrap();
            showToast("Contraseña actualizada correctamente", "success");
            setModalPassword(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar contraseña", "error");
        }
    };

    const rolConfig = usuario ? ROL_BADGE[usuario.rol] : null;

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.seccion}`}>Detalle de Usuario</h2>

            <LoadingWrapper isLoading={isLoading} error={error} isEmpty={!usuario}>
                {usuario && (
                    <div className={styles.card}>
                        <div className={styles.filaData}>
                            <DataField label="ID"     value={`#${usuario.id}`}  />
                            <DataField label="Nombre" value={usuario.nombre}     />
                            <DataField label="Email"  value={usuario.email}      />
                        </div>

                        <div className={styles.filaData}>
                            <DataField label="Rol" value={(() => {
                                if (!rolConfig) return usuario.rol;
                                const Icono = ICONS[rolConfig.icono];
                                return (
                                    <span className={rolConfig.clase} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                        {Icono && <Icono size={12} />}
                                        {usuario.rol}
                                    </span>
                                );
                            })()} />
                            <DataField label="Estado" value={
                                <span className={usuario.estado ? "badge badge-success" : "badge badge-neutral"}>
                                    {usuario.estado ? "Activo" : "Inactivo"}
                                </span>
                            } />
                            <DataField label="Fecha creación" value={
                                new Date(usuario.fechaCreacion).toLocaleDateString("es-AR")
                            } />
                        </div>

                        <div className={styles.acciones}>
                            <Button icon="edit" variant="ghost" size="md"
                                onClick={() => setModalEditar(true)}>
                                Editar Usuario
                            </Button>
                            <Button
                                icon={usuario.estado ? "trash" : "check"}
                                variant={usuario.estado ? "danger" : "success-2"}
                                size="md"
                                onClick={() => setModalEstado(true)}
                            >
                                {usuario.estado ? "Desactivar usuario" : "Activar usuario"}
                            </Button>
                            <Button icon="lockClosed" variant="ghost" size="md"
                                onClick={() => setModalPassword(true)}>
                                Cambiar contraseña
                            </Button>
                        </div>
                    </div>
                )}
            </LoadingWrapper>

            <ModalEditarUsuario
                isOpen={modalEditar}
                usuario={usuario}
                onClose={() => setModalEditar(false)}
                onConfirm={handleEditarUsuario}

            />
            <ModalAlterarEstado
                isOpen={modalEstado}
                usuario={usuario}
                onClose={() => setModalEstado(false)}
                onConfirm={handleAlterarEstado}
            />
            <ModalCambiarPassword
                isOpen={modalPassword}
                onClose={() => setModalPassword(false)}
                onConfirm={handleCambiarPassword}
            />
        </div>
    );
}