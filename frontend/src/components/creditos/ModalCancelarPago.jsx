import Modal from "../../components/common/Modal";
import { ICONS } from "../../utils/icontypes";

export default function ModalCancelarPago({ isOpen, cuota, onClose, onConfirm }) {
    if (!cuota) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Anular pago — Cuota #${cuota.numeroCuota}`}
            description={`¿Confirmás la anulación del pago de $${cuota.monto?.toLocaleString()}? La cuota volverá a estado pendiente y se reevaluará la mora del crédito.`}
            icon={ICONS.alert}
            iconVariant="warning"
            size="sm"
            actions={[{
                label: "Anular pago",
                onClick: () => onConfirm(cuota.id),
                variant: "danger",
            }]}
        />
    );
}