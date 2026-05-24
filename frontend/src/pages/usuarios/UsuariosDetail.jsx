import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";
import ModalEditarUsuario from "../../components/usuarios/ModalEditarUsuario";
import ModalAlterarEstado from "../../components/usuarios/ModalAlterarEstado";
import ModalCambiarPassword from "../../components/usuarios/ModalCambiarPassword";
import { ICONS } from "../../utils/icontypes";
import styles from "../PagesDetail.module.css";

import { getUsuarioById, editarUsuario, cambiarEstadoUsuario, resetearPassword } from "../../api/usuarioApi";

const ROL_BADGE = {
    ADMIN:    { clase: "badge badge-danger",  icono: "shieldCheck"  },
    ANALISTA: { clase: "badge badge-info",    icono: "clipboardPen" },
    COBRADOR: { clase: "badge badge-neutral", icono: "atSign"       },
};

export default function UsuariosDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [usuario,   setUsuario]   = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error,     setError]     = useState(null);

    const [modalEditar,   setModalEditar]   = useState(false);
    const [modalEstado,   setModalEstado]   = useState(false);
    const [modalPassword, setModalPassword] = useState(false);

    useEffect(() => {
        if (!id || id === "undefined") return;
        const cargar = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getUsuarioById(id);
                setUsuario(data);
            } catch (e) {
                showToast("Usuario no encontrado", "warning");
                navigate("/usuarios", { replace: true });
            } finally {
                setIsLoading(false);
            }
        };
        cargar();
    }, [id]);

    const handleEditarUsuario = async ({ nombre, rol }) => {
        try {
            const updated = await editarUsuario(id, {
                nombre,
                rol,
                estado: usuario.estado,
            });
            setUsuario(updated);
            showToast("Usuario actualizado correctamente", "success");
            setModalEditar(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al editar usuario", "error");
        }
    };

    const handleAlterarEstado = async () => {
        try {
            await cambiarEstadoUsuario(id);
            setUsuario(prev => ({ ...prev, estado: !prev.estado }));
            showToast(usuario.estado ? "Usuario desactivado" : "Usuario activado", "success");
            setModalEstado(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar estado", "error");
        }
    };

    const handleCambiarPassword = async (password) => {
        try {
            await resetearPassword(id, password);
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
                                variant={usuario.estado ? "danger" : "success"}
                                size="md"
                                onClick={() => setModalEstado(true)}
                            >
                                {usuario.estado ? "Desactivar usuario" : "Activar usuario"}
                            </Button>
                            <Button icon="lock" variant="ghost" size="md"
                                onClick={() => setModalPassword(true)}>
                                Cambiar contraseña
                            </Button>
                        </div>
                    </div>
                )}
            </LoadingWrapper>

            <ModalEditarUsuario
                isOpen={modalEditar}
                nombreActual={usuario?.nombre}
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