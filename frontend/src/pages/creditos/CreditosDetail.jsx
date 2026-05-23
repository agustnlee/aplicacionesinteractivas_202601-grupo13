import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import FichaCuota from "../../components/creditos/FichaCuota";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";
import ModalCambiarCobrador from "../../components/creditos/ModalCambiarCobrador";
import ModalCancelarCredito from "../../components/creditos/ModalCancelarCredito";
import ModalPago from "../../components/creditos/ModalPago";
import ModalCancelarPago from "../../components/creditos/ModalCancelarPago";
import ModalDetallePago from "../../components/creditos/ModalDetallePago";
import styles from "../PagesDetail.module.css";

import { getCreditoById, cambiarCobrador, cancelarCredito } from "../../api/creditoApi";
import { registrarPago, cancelarPago, getPagosPorCredito } from "../../api/pagoApi";

const ESTADO_CREDITO_BADGE = {
    ACTIVO:                   "badge badge-success",
    EN_MORA:                  "badge badge-danger",
    CANCELADO:                "badge badge-neutral",
    CANCELADO_REFINANCIACION: "badge badge-warning",
    CERRADO:                  "badge badge-info",
};

const ESTADOS_FINALES = ["CERRADO", "CANCELADO", "CANCELADO_REFINANCIACION"];

const CUOTAS_HEADER = [
    { label: "ID",          width: "50px"  },
    { label: "Vencimiento", width: "120px" },
    { label: "Monto",       width: "100px" },
    { label: "Estado",      width: "110px" },
    { label: "Recargo",     width: "100px" },
];

export default function CreditosDetail() {
    const { id } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [credito,  setCredito]  = useState(null);
    const [pagos,    setPagos]    = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error,    setError]    = useState(null);

    const [modalCobrador,    setModalCobrador]    = useState(false);
    const [modalCancelar,    setModalCancelar]    = useState(false);
    const [modalPago,        setModalPago]        = useState({ open: false, cuota: null });
    const [modalCancelPago,  setModalCancelPago]  = useState({ open: false, cuota: null });
    const [modalPagoDetalle, setModalPagoDetalle] = useState({ open: false, pago: null });

    // Carga inicia
    useEffect(() => {
        if (!id) return;
        const cargar = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [creditoData, pagosData] = await Promise.all([
                    getCreditoById(id),
                    getPagosPorCredito(id),
                ]);
                setCredito(creditoData);
                setPagos(pagosData);
            } catch (e) {
                showToast("Crédito no encontrado", "warning");
                navigate("/creditos", { replace: true });
            } finally {
                setIsLoading(false);
            }
        };
        cargar();
    }, [id]);

    const esFinal = ESTADOS_FINALES.includes(credito?.estado);

    // Handlers
    const handleCambiarCobrador = async (nuevoCobradorId) => {
        try {
            const updated = await cambiarCobrador(id, nuevoCobradorId);
            setCredito(updated);
            showToast("Cobrador actualizado correctamente", "success");
            setModalCobrador(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar cobrador", "error");
        }
    };

    const handleCancelarCredito = async (motivoCancelacion) => {
        try {
            const updated = await cancelarCredito(id, motivoCancelacion);
            setCredito(updated);
            showToast("Crédito cancelado", "success");
            setModalCancelar(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cancelar crédito", "error");
        }
    };

    const handlePagar = async (cuotaId, metodo, observaciones) => {
        try {
            const nuevoPago = await registrarPago(cuotaId, metodo, observaciones);
            // update estado cuota local
            setCredito(prev => ({
                ...prev,
                cuotas: prev.cuotas.map(c =>
                    c.id === cuotaId ? { ...c, estado: "PAGADA" } : c
                ),
            }));
            setPagos(prev => [...prev, nuevoPago]);
            showToast("Pago registrado correctamente", "success");
            setModalPago({ open: false, cuota: null });
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al registrar pago", "error");
        }
    };

    const handleCancelarPago = async (cuota) => {
        const pago = pagos.find(p => p.cuotaId === cuota.id);
        if (!pago) return;
        try {
            await cancelarPago(pago.id);  
            // revert estado local
            setCredito(prev => ({
                ...prev,
                cuotas: prev.cuotas.map(c =>
                    c.id === cuota.id ? { ...c, estado: "PENDIENTE" } : c
                ),
            }));
            // sacar pago de local
            setPagos(prev => prev.filter(p => p.id !== pago.id));
            showToast("Pago cancelado", "success");
            setModalCancelPago({ open: false, cuota: null });
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cancelar pago", "error");
        }
    };

    const handleVerDetalle = (cuota) => {
        const pago = pagos.find(p => p.cuotaId === cuota.id);
        setModalPagoDetalle({ open: true, pago });
    };


    // render 

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.seccion}`}>Detalle de Crédito</h2>

            <LoadingWrapper isLoading={isLoading} error={error} isEmpty={!credito}>
                {credito && (
                    <>
                        <div className={styles.card}>
                            <div className={styles.filaData}>
                                <DataField label="ID"       value={`#${credito.id}`} />
                                <DataField label="Cliente"  value={
                                    <Link to={`/clientes/${credito.clienteId}`} className={styles.link}>
                                        {credito.clienteNombre}
                                    </Link>
                                } />
                                <DataField label="Cobrador" value={
                                    <Link to={`/usuarios/${credito.cobradorId}`} className={styles.link}>
                                        {credito.cobradorNombre}
                                    </Link>
                                } />
                                <DataField label="Creado por" value={
                                    <Link to={`/usuarios/${credito.creadoPorId}`} className={styles.link}>
                                        {credito.creadoPorNombre}
                                    </Link>
                                } />
                                <DataField label="Monto"   value={`$${Number(credito.monto).toLocaleString()}`} />
                                <DataField label="Interés" value={`${credito.interes}%`} />
                            </div>

                            <div className={styles.filaData}>
                                <DataField label="Cuotas"       value={credito.cantidadCuotas} />
                                <DataField label="Fecha inicio" value={credito.fechaCreacion} />
                                <DataField label="Estado" value={
                                    <span className={ESTADO_CREDITO_BADGE[credito.estado] ?? "badge badge-neutral"}>
                                        {credito.estado.replace(/_/g, " ")}
                                    </span>
                                } />
                            </div>

                            {!esFinal && (
                                <div className={styles.acciones}>
                                    <Button icon="edit"  variant="ghost"  size="md" onClick={() => setModalCobrador(true)}>
                                        Modificar cobrador
                                    </Button>
                                    <Button icon="trash" variant="danger" size="md" onClick={() => setModalCancelar(true)}>
                                        Cancelar crédito
                                    </Button>
                                </div>
                            )}
                        </div>

                        <h2 className={`title ${styles.seccion}`}>Cuotas</h2>

                        <PaginatedContainer
                            columns={CUOTAS_HEADER}
                            hasActions
                            isLoading={false}
                            isEmpty={!credito.cuotas?.length}
                            currentPage={0}
                            totalPages={1}
                        >
                            {credito.cuotas?.map(cuota => (
                                <FichaCuota
                                    key={cuota.id}
                                    cuota={cuota}
                                    esFinalCredito={esFinal}
                                    onPagar={() => setModalPago({ open: true, cuota })}
                                    onCancelarPago={() => setModalCancelPago({ open: true, cuota })}
                                    onVerDetalle={handleVerDetalle}
                                />
                            ))}
                        </PaginatedContainer>
                    </>
                )}
            </LoadingWrapper>

            <ModalCambiarCobrador
                isOpen={modalCobrador}
                onClose={() => setModalCobrador(false)}
                onConfirm={handleCambiarCobrador}
            />
            <ModalCancelarCredito
                isOpen={modalCancelar}
                onClose={() => setModalCancelar(false)}
                onConfirm={handleCancelarCredito}
            />
            <ModalPago
                isOpen={modalPago.open}
                cuota={modalPago.cuota}
                onClose={() => setModalPago({ open: false, cuota: null })}
                onConfirm={handlePagar}
            />
            <ModalCancelarPago
                isOpen={modalCancelPago.open}
                cuota={modalCancelPago.cuota}
                onClose={() => setModalCancelPago({ open: false, cuota: null })}
                onConfirm={handleCancelarPago}
            />
            <ModalDetallePago
                isOpen={modalPagoDetalle.open}
                pago={modalPagoDetalle.pago}
                onClose={() => setModalPagoDetalle({ open: false, pago: null })}
            />
        </div>
    );
}