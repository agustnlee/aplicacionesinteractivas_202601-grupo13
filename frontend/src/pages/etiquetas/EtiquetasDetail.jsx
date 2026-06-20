import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    ObtenerEtiquetaPorIdThunk, ModificarEtiquetaThunk, EliminarEtiquetaThunk, limpiarEtiquetaActual 
} from "../../store/EtiquetaSlice";

import { 
    ContarClientesPorEtiquetaThunk, AsignarEtiquetaThunk, EliminarAsignacionThunk, ObtenerEtiquetaPorClienteThunk 
} from "../../store/ClienteEtiquetaSlice";


import { useToast } from "../../hooks/useToast";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";
import ModalEditarEtiqueta from "../../components/etiquetas/ModalEditarEtiqueta";
import ModalAsignarDesasignarEtiqueta from "../../components/etiquetas/ModalAsignarDesasignarEtiqueta";
import ModalEliminarEtiqueta from "../../components/etiquetas/ModalEliminarEtiqueta";
import ColorPalette from "../../components/common/ColorPalette";
import styles from "../PagesDetail.module.css";



export default function EtiquetasDetail() {
    const { id }        = useParams();
    const navigate      = useNavigate();
    const { showToast } = useToast();
    const dispatch      = useDispatch();

    // Contexto de la Etiqueta (desde EtiquetaSlice)
    const { 
        etiquetaActual: etiqueta, 
        loading: isEtiquetaLoading, 
        error: etiquetaError 
    } = useSelector(state => state.etiquetas);

    // Contexto de los Clientes (desde ClienteEtiquetaSlice)
    const { 
        conteoClientesPorEtiqueta: cantClientes, 
        loading: isClientesLoading 
    } = useSelector(state => state.clienteEtiquetas);

    // Unificamos las banderas de carga
    const isLoading = isEtiquetaLoading || isClientesLoading;
    const error = etiquetaError;

    // Estados de UI
    const [modalEditar,   setModalEditar]   = useState(false);
    const [modalGestionar,setModalGestionar]= useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    useEffect(() => {
        if (!id || id === "undefined") return;
        
        const cargarDetalle = async () => {
            try {
                await Promise.all([
                    dispatch(ObtenerEtiquetaPorIdThunk(id)).unwrap(),
                    dispatch(ContarClientesPorEtiquetaThunk(id)).unwrap(),
                ]);
            } catch (e) {
                showToast("Etiqueta no encontrada", "warning");
                navigate("/etiquetas", { replace: true });
            }
        };
        
        cargarDetalle();

        // Cleanup: Limpia el detalle actual al desmontar el componente
        return () => { dispatch(limpiarEtiquetaActual()); };
    }, [id, dispatch, navigate, showToast]);

    const handleEditar = async ({ nombre, descripcion }) => {
        try {
            await dispatch(ModificarEtiquetaThunk({
                id,
                data: {
                    nombreEtiqueta:      nombre,
                    colorEtiqueta:       etiqueta.colorEtiqueta,
                    descripcionEtiqueta: descripcion,
                }
            })).unwrap();
            showToast("Etiqueta actualizada correctamente", "success");
            setModalEditar(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al editar etiqueta", "error");
        }
    };

    const handleCambiarColor = async (color) => {
        try {
            await dispatch(ModificarEtiquetaThunk({
                id, 
                data: {
                    nombreEtiqueta:      etiqueta.nombreEtiqueta,
                    colorEtiqueta:       color,
                    descripcionEtiqueta: etiqueta.descripcionEtiqueta,
                }
            })).unwrap();
            showToast("Color actualizado correctamente", "success");
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar color", "error");
        }
    };

    const handleAsignar = async (clienteId) => {
        try {
            await dispatch(AsignarEtiquetaThunk({ clienteId, etiquetaId: id })).unwrap();
            showToast(`Etiqueta asignada al cliente #${clienteId}`, "success");
            setModalGestionar(false);
            dispatch(ContarClientesPorEtiquetaThunk(id)); // Recalcula el contador
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al asignar etiqueta", "error");
        }
    };

    const handleDesasignar = async (clienteId) => {
        try {
            const data = await dispatch(ObtenerEtiquetaPorClienteThunk({ 
                clienteId, 
                params: { pagina: 0, tamanio: 50 } 
            })).unwrap();
            
            const asignacion = data.contenido?.find(a => a.etiquetaId === Number(id));
            
            if (!asignacion) {
                showToast("Este cliente no tiene esta etiqueta asignada", "warning");
                return;
            }
            
            await dispatch(EliminarAsignacionThunk(asignacion.id)).unwrap();
            showToast(`Etiqueta desasignada del cliente #${clienteId}`, "success");
            setModalGestionar(false);
            dispatch(ContarClientesPorEtiquetaThunk(id)); // Recalcula el contador
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al desasignar etiqueta", "error");
        }
    };

    const handleEliminar = async () => {
        try {
            await dispatch(EliminarEtiquetaThunk(id)).unwrap();
            showToast("Etiqueta eliminada", "success");
            navigate("/etiquetas", { replace: true });
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al eliminar etiqueta", "error");
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.seccion}`}>Detalle de Etiqueta</h2>

            <LoadingWrapper isLoading={isLoading} error={error} isEmpty={!etiqueta}>
                {etiqueta && (
                    <div className={styles.card}>
                        <div className={styles.filaData}>
                            <DataField label="ID"     value={`#${etiqueta.etiquetaId || etiqueta.id}`} />
                            <DataField label="Nombre" value={etiqueta.nombreEtiqueta || etiqueta.nombre} />
                            <DataField label="Descripción" value={
                                etiqueta.descripcionEtiqueta?.trim() || etiqueta.descripcion?.trim()
                                    ? (etiqueta.descripcionEtiqueta || etiqueta.descripcion)
                                    : <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Sin descripción</span>
                            } />
                            <DataField label="Clientes asignados" value={cantClientes} />
                        </div>

                        <div className={styles.filaData}>
                            <DataField label="Color actual" value={
                                <div style={{
                                    width: "28px", height: "28px",
                                    backgroundColor: etiqueta.colorEtiqueta || etiqueta.color,
                                    borderRadius: "50%",
                                    border: "1px solid rgba(0,0,0,0.15)",
                                    marginTop: "var(--space-1)",
                                }} />
                            } />
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-xs)" }}>
                                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: "var(--font-medium)" }}>
                                    Cambiar color
                                </span>
                                <ColorPalette onConfirm={handleCambiarColor} />
                            </div>
                        </div>

                        <div className={styles.acciones}>
                            <Button icon="edit" variant="ghost" size="md" onClick={() => setModalEditar(true)}>
                                Editar etiqueta
                            </Button>
                            <Button icon="user" variant="ghost" size="md" onClick={() => setModalGestionar(true)}>
                                Gestionar Asignaciones
                            </Button>
                            <Button icon="trash" variant="danger" size="md" onClick={() => setModalEliminar(true)}>
                                Eliminar etiqueta
                            </Button>
                        </div>
                    </div>
                )}
            </LoadingWrapper>

            <ModalEditarEtiqueta
                isOpen={modalEditar}
                etiqueta={etiqueta}
                onClose={() => setModalEditar(false)}
                onConfirm={handleEditar}
            />
            <ModalAsignarDesasignarEtiqueta
                isOpen={modalGestionar}
                onClose={() => setModalGestionar(false)}
                onAsignar={handleAsignar}
                onDesasignar={handleDesasignar}
            />
            <ModalEliminarEtiqueta
                isOpen={modalEliminar}
                etiqueta={etiqueta}
                cantClientes={cantClientes}
                onClose={() => setModalEliminar(false)}
                onConfirm={handleEliminar}
            />
        </div>
    );
}
