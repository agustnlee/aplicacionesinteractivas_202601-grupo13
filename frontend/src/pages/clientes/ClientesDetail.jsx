import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { ObtenerFichaClienteThunk, EditarClienteThunk, AlterarEstadoClienteThunk, limpiarClienteActual } from "../../store/ClienteSlice";
import { crearCredito, getCreditos } from "../../api/creditoApi";//FAALTA SLICE DE CREDITOS
import { useToast } from "../../hooks/useToast";

import PaginatedContainer from "../../components/common/PaginatedContainer";
import FichaCreditoCliente from "../../components/clientes/FichaCreditoCliente";
import FichaEtiquetaCliente from "../../components/clientes/FichaEtiquetaCliente";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";

import ModalEditarCliente from "../../components/clientes/ModalEditarCliente";
import ModalAlterarEstado from "../../components/clientes/ModalAlterarEstado";
import ModalCrearCredito from "../../components/creditos/ModalCrearCredito";

import styles from "../PagesDetail.module.css";

const COLUMNS_CREDITOS = [
    { label: "ID",       width: "60px"  },
    { label: "Cobrador", width: "130px" },
    { label: "Monto",    width: "110px" },
    { label: "Cuotas",   width: "80px"  },
    { label: "Interés",  width: "80px"  },
    { label: "Fecha",    width: "110px" },
    { label: "Estado",   width: "140px" },
];

const FIELDS_CREDITOS = [
    { key: "estado", label: "Estado", type: "select", options: [
        { value: "ACTIVO",                   label: "Activo"                   },
        { value: "EN_MORA",                  label: "En mora"                  },
        { value: "CERRADO",                  label: "Cerrado"                  },
        { value: "CANCELADO",                label: "Cancelado"                },
        { value: "CANCELADO_REFINANCIACION", label: "Cancelado refinanciación" },
    ]},
];

export default function ClientesDetail() {
    const { id } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { clienteActual: cliente, loading: fichaLoading } = useSelector((state) => state.clientes);

    const [creditos, setCreditos]                     = useState([]);
    const [creditosTotalPages, setCreditosTotalPages] = useState(0);
    const [creditosLoading, setCreditosLoading]       = useState(true);
    const [creditosError, setCreditosError]           = useState(null);

    const [modalEditar,  setModalEditar]  = useState(false);
    const [modalEstado,  setModalEstado]  = useState(false);
    const [modalCredito, setModalCredito] = useState(false);

    const creditoPage   = parseInt(searchParams.get("pagina") ?? "0", 10);
    const creditoEstado = searchParams.get("estado") ?? undefined;

    const cargarFicha = useCallback(async () => {
        dispatch(ObtenerFichaClienteThunk(id)).unwrap()
            .catch(() => {
                showToast("El cliente solicitado no existe", "error");
                navigate("/clientes", { replace: true });
            });
    }, [id, dispatch, navigate, showToast]);

    const cargarCreditos = useCallback(async () => {
        setCreditosLoading(true);
        setCreditosError(null);
        try {
            const data = await getCreditos({
                clienteId: id,
                ...(creditoEstado && { estado: creditoEstado }),
                pagina:  creditoPage,
                tamanio: 5,
            });
            setCreditos(data.contenido ?? []);
            setCreditosTotalPages(data.totalPaginas ?? 0);
        } catch (err) {
            setCreditosError(err?.mensajes?.[0] ?? "Error al cargar créditos");
        } finally {
            setCreditosLoading(false);
        }
    }, [id, creditoPage, creditoEstado]);

    useEffect(() => { cargarFicha();
        return () => {
            dispatch(limpiarClienteActual());
        };
     },    [cargarFicha]);
    useEffect(() => { cargarCreditos(); }, [cargarCreditos]);

    const handleEditarCliente = async (clienteId, requestData) => {
        try {
            await dispatch(EditarClienteThunk({ id: clienteId, data: requestData })).unwrap();
            showToast("Datos actualizados exitosamente", "success");
            setModalEditar(false);
        } catch (err) {
            showToast(err?.mensajes?.[0] ?? "Error al actualizar el cliente", "error");
            throw err;
        }
    };

    const handleAlterarEstado = async (clienteId, nuevoEstado) => {
        try {
            await dispatch(AlterarEstadoClienteThunk(clienteId)).unwrap();
            showToast(`Cliente ${nuevoEstado ? "dado de alta" : "dado de baja"} exitosamente`, "success");
            setModalEstado(false);
        } catch (err) {
            showToast(err?.mensajes?.[0] ?? "Error al alterar el estado", "error");
            throw err;
        }
    };

    const handleCrearCredito = async (datosDelModal) => {
        try {
            await crearCredito(datosDelModal);
            showToast("Crédito creado exitosamente", "success");
            setModalCredito(false);
            await cargarCreditos();
        } catch (err) {
            showToast(err?.mensajes?.[0] ?? "Error al crear el crédito", "error");
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.titulo}`}>Detalle de Cliente</h2>

            <LoadingWrapper isLoading={fichaLoading} error={null} isEmpty={!cliente && !fichaLoading}>
                {cliente && (
                    <>
                        {/* ── Card datos ─────────────────────────────── */}
                        <div className={styles.card}>
                            <div className={styles.filaData}>
                                <DataField label="ID"           value={`#${cliente.id}`} />
                                <DataField label="Nombre"       value={<strong>{cliente.nombre}</strong>} />
                                <DataField label="DNI"          value={cliente.dni} />
                                <DataField label="Email"        value={cliente.email} />
                                <DataField label="Teléfono"     value={cliente.telefono} />
                                <DataField label="Domicilio"    value={cliente.domicilio} />
                                <DataField label="Fecha de Alta" value={
                                    new Date(cliente.fechaCreacion)
                                        .toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })
                                        .split(",")[0]
                                } />
                                <DataField label="Creado por" value={
                                    cliente.idCreador
                                        ? <Link to={`/usuarios/${cliente.idCreador}`} className={styles.link}>{cliente.creadorNombre}</Link>
                                        : cliente.creadorNombre
                                } />
                                <DataField label="Estado" value={
                                    <span className={`badge ${cliente.estado ? "badge-success" : "badge-danger"}`}>
                                        {cliente.estado ? "Activo" : "Inactivo"}
                                    </span>
                                } />
                            </div>

                            <div className={styles.acciones}>
                                <Button icon="edit" variant="ghost" size="md" onClick={() => setModalEditar(true)}>
                                    Modificar datos
                                </Button>
                                <Button
                                    icon={cliente.estado ? "lockClosed" : "lockOpen"}
                                    variant={cliente.estado ? "danger" : "success"}
                                    size="md"
                                    onClick={() => setModalEstado(true)}
                                >
                                    {cliente.estado ? "Dar de baja" : "Dar de alta"}
                                </Button>
                            </div>
                        </div>

                        {/* ── Etiquetas ──────────────────────────────── */}
                        <h3 className={`title ${styles.titulo}`} style={{ marginTop: "var(--space-4)" }}>
                            Etiquetas de {cliente.nombre}
                        </h3>
                        <div className={styles.card}>
                            <FichaEtiquetaCliente etiquetas={cliente.detalleEtiquetas ?? []} />
                        </div>

                        {/* ── Créditos ───────────────────────────────── */}
                        <h3 className={`title ${styles.titulo}`} style={{ marginTop: "var(--space-4)" }}>
                            Créditos de {cliente.nombre}
                        </h3>
                        <PaginatedContainer
                            fields={FIELDS_CREDITOS}
                            columns={COLUMNS_CREDITOS}
                            isLoading={creditosLoading}
                            isEmpty={!creditos.length}
                            error={creditosError}
                            currentPage={creditoPage}
                            totalPages={creditosTotalPages}
                            onCreate={() => setModalCredito(true)}
                        >
                            {creditos.map((c) => (
                                <FichaCreditoCliente key={c.id} credito={c} />
                            ))}
                        </PaginatedContainer>
                    </>
                )}
            </LoadingWrapper>

            {cliente && (
                <>
                    <ModalEditarCliente
                        isOpen={modalEditar}
                        onClose={() => setModalEditar(false)}
                        clienteActual={cliente}
                        onSubmit={handleEditarCliente}
                    />
                    <ModalAlterarEstado
                        isOpen={modalEstado}
                        onClose={() => setModalEstado(false)}
                        clienteId={cliente.id}
                        estadoActual={cliente.estado}
                        onSubmit={handleAlterarEstado}
                    />
                    <ModalCrearCredito
                        isOpen={modalCredito}
                        onClose={() => setModalCredito(false)}
                        onConfirm={handleCrearCredito}
                        clienteId={id}
                    />
                </>
            )}
        </div>
    );
}