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
import styles from "./CreditosDetail.module.css";

// import { getCreditoById, cambiarCobrador, cancelarCredito } from "../../api/creditoApi";
// import { registrarPago, cancelarPago } from "../../api/pagoApi";

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
        { id: 3, numeroCuota: 3, fechaVencimiento: "2026-02-01", monto: 6325, montoRecargo: 632.5, montoTotal: 6957.5, estado: "VENCIDA"  },
        { id: 4, numeroCuota: 4, fechaVencimiento: "2026-05-01", monto: 6325, montoRecargo: 0,     montoTotal: 6325,   estado: "PENDIENTE"},
        { id: 5, numeroCuota: 5, fechaVencimiento: "2026-06-15", monto: 6325, montoRecargo: 0,     montoTotal: 6325,   estado: "PENDIENTE"},
    ],
};

const ESTADO_COLORS = {
    ACTIVO:                  "badge badge-success",
    EN_MORA:                 "badge badge-danger",
    CANCELADO:               "badge badge-neutral",
    CANCELADO_REFINANCIACION:"badge badge-warning",
    CERRADO:                 "badge badge-info",
};

const ESTADOS_FINALES = ["CERRADO", "CANCELADO", "CANCELADO_REFINANCIACION"];



export default function CreditosDetail() {
    const { id } = useParams();

    const { showToast } = useToast();

    const [credito, setCredito]     = useState(MOCK_CREDITO);
    const [isLoading]               = useState(false);
    const [error]                   = useState(null);

    const [modalCobrador, setModalCobrador]     = useState(false);
    const [modalCancelar, setModalCancelar]     = useState(false);
    const [modalPago, setModalPago]             = useState({ open: false, cuota: null });
    const [modalCancelPago, setModalCancelPago] = useState({ open: false, cuota: null });

    const esFinal     = ESTADOS_FINALES.includes(credito?.estado);

    const handleCambiarCobrador = async (nuevoCobradorId) => {
        try {
            // const updated = await cambiarCobrador(id, nuevoCobradorId);
            // setCredito(updated);
            showToast("Cobrador actualizado correctamente", "success");
            setModalCobrador(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar cobrador", "error");
        }
    };

    const handleCancelarCredito = async (motivo) => {
        try {
            // const updated = await cancelarCredito(id, motivo);
            // setCredito(updated);
            showToast("Crédito cancelado", "success");
            setModalCancelar(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cancelar crédito", "error");
        }
    };

    const handlePagar = async (cuotaId, metodo, observaciones) => {
        try {
            // await registrarPago(cuotaId, metodo, observaciones);
            showToast("Pago registrado correctamente", "success");
            setModalPago({ open: false, cuota: null });
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al registrar pago", "error");
        }
    };

    const handleCancelarPago = async (cuotaId) => {
        try {
            // await cancelarPago(cuotaId);
            showToast("Pago cancelado", "success");
            setModalCancelPago({ open: false, cuota: null });
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cancelar pago", "error");
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.titulo}`}>Detalle de Crédito</h2>

            <LoadingWrapper isLoading={isLoading} error={error} isEmpty={!credito}>

                {/* card datos */}
                <div className={styles.card}>
                    <div className={styles.filaData}>
                       <DataField label="ID" value={`#${credito.id}`} />
                       <DataField label="Cliente" value={
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
                        <DataField label="Monto"    value={`$${credito.monto.toLocaleString()}`} />
                        <DataField label="Interés"  value={`${credito.interes}%`} />
                    </div>

                    <div className={styles.filaData}>
                        <DataField label="Cuotas"      value={credito.cantidadCuotas} />
                        <DataField label="Fecha inicio" value={credito.fechaCreacion} />
                        <DataField label="Estado" value={
                            <span className={ESTADO_COLORS[credito?.estado] ?? ESTADO_COLORS.ACTIVO}>
                                {credito.estado.replace("/_/g,", " ")}
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

                {/* cuotas */}
                <PaginatedContainer
                    title="Cuotas"
                    isLoading={isLoading}
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
        </div>
    );
}