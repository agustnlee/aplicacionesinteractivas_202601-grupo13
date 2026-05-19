import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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

// import { getCreditoById, cambiarCobrador, cancelarCredito } from "../../api/creditoApi";
// import { registrarPago, cancelarPago, getPagosPorCredito } from "../../api/pagoApi";

const MOCK_CREDITO = {
    id: 101,
    clienteId: 1,
    clienteNombre: "Juan",
    cobradorId: 5,
    cobradorNombre: "Nicolás",
    creadoPorId: 2,
    creadoPorNombre: "Admin",
    monto: 55000,
    cantidadCuotas: 5,
    interes: 15,
    estado: "EN_MORA",
    fechaCreacion: "2026-01-10",
    cuotas: [
        { id: 1, numeroCuota: 1, fechaVencimiento: "2026-01-17", monto: 6325, montoRecargo: 632.5, montoTotal: 6957.5, estado: "PAGADA"   },
        { id: 2, numeroCuota: 2, fechaVencimiento: "2026-01-24", monto: 6325, montoRecargo: 632.5, montoTotal: 6957.5, estado: "PAGADA"   },
        { id: 3, numeroCuota: 3, fechaVencimiento: "2026-02-01", monto: 6325, montoRecargo: 632.5, montoTotal: 6957.5, estado: "PENDIENTE"  },
        { id: 4, numeroCuota: 4, fechaVencimiento: "2026-05-01", monto: 6325, montoRecargo: 0,     montoTotal: 6325,   estado: "PENDIENTE"},
        { id: 5, numeroCuota: 5, fechaVencimiento: "2026-06-15", monto: 6325, montoRecargo: 632.5,     montoTotal: 6325,   estado: "VENCIDA"},
    ],
};

const MOCK_PAGOS = [
    { id: 1, cuotaId: 1, numeroCuota: 1, monto: 6957.5,  metodo: "TRANSFERENCIA", cobradoPorNombre: "Nicolás", observaciones: "Llegó tarde pero pagó completo.", fechaPagado: "2026-01-17T10:30:00" },
    { id: 2, cuotaId: 2, numeroCuota: 2, monto: 6957.5,  metodo: "EFECTIVO",      cobradoPorNombre: "Nicolás", observaciones: null,                                  fechaPagado: "2026-01-24T09:15:00" },
];



const ESTADO_CREDITO_BADGE = {
    ACTIVO:                  "badge badge-success",
    EN_MORA:                 "badge badge-danger",
    CANCELADO:               "badge badge-neutral",
    CANCELADO_REFINANCIACION:"badge badge-warning",
    CERRADO:                 "badge badge-info",
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

    const [credito, setCredito]     = useState(MOCK_CREDITO);
    const [pagos, setPagos]             = useState(MOCK_PAGOS);

    const [isLoading]               = useState(false);
    const [error]                   = useState(null);

    const [modalCobrador, setModalCobrador]     = useState(false);
    const [modalCancelar, setModalCancelar]     = useState(false);
    const [modalPago, setModalPago]             = useState({ open: false, cuota: null });
    const [modalCancelPago, setModalCancelPago] = useState({ open: false, cuota: null });
    const [modalPagoDetalle, setModalPagoDetalle] = useState({ open: false, pago: null });

    const esFinal = ESTADOS_FINALES.includes(credito?.estado);

    const handleCambiarCobrador = async (nuevoCobradorId) => {
        try {
            showToast("Cobrador actualizado correctamente", "success");
            setModalCobrador(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar cobrador", "error");
        }
    };

    const handleCancelarCredito = async (motivo) => {
        try {
            showToast("Crédito cancelado", "success");
            setModalCancelar(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cancelar crédito", "error");
        }
    };

    const handlePagar = async (cuotaId, metodo, observaciones) => {
        try {
            showToast("Pago registrado correctamente", "success");
            setModalPago({ open: false, cuota: null });
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al registrar pago", "error");
        }
    };

    const handleCancelarPago = async (cuotaId) => {
        try {
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


    return (
        <div className={styles.page}>
            <h2 className={`title  ${styles.seccion}`}>Detalle de Crédito</h2>

            <LoadingWrapper isLoading={isLoading} error={error} isEmpty={!credito}>

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
                        <DataField label="Monto"   value={`$${credito.monto.toLocaleString()}`} />
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
                
                <h2 className={`title  ${styles.seccion}`}>Cuotas</h2>

                <PaginatedContainer
                    columns={CUOTAS_HEADER}
                    hasActions
                    isLoading={isLoading}
                    isEmpty={!credito.cuotas?.length}
                    error={error}
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