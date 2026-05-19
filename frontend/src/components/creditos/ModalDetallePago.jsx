import Modal from "../common/Modal";
import ModalRow from "../common/ModalRow";
import { ICONS } from "../../utils/icontypes";

const METODO_LABEL = {
    EFECTIVO:      "Efectivo",
    TRANSFERENCIA: "Transferencia",
    DEBITO:        "Débito",
    CREDITO:       "Crédito",
};

export default function ModalDetallePago({ isOpen, pago, onClose }) {
    if (!pago) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Detalle de pago — Cuota #${pago.numeroCuota}`}
            icon={ICONS.clipboardPen}
            iconVariant="success"
            size="sm"   
            actions={[]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <ModalRow label="Monto pagado"  value={`$${pago.monto?.toLocaleString()}`} />
                <ModalRow label="Método"        value={METODO_LABEL[pago.metodo] ?? pago.metodo} />
                <ModalRow label="Cobrado por"   value={pago.cobradoPorNombre} />
                <ModalRow label="Fecha"         value={new Date(pago.fechaPagado).toLocaleString("es-AR")} />
                <ModalRow label="Observaciones" value={pago.observaciones?.trim() || <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Sin observaciones.</span>} />
            </div>
        </Modal>
    );
}

