import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";

export default function ModalEliminar({ isOpen, etiqueta, cantClientes = 0, onClose, onConfirm }) {
    if (!etiqueta) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Eliminar etiqueta"
            description={
                cantClientes > 0 ? (
                    <span>
                        Esta etiqueta tiene <strong>{cantClientes} cliente{cantClientes > 1 ? "s" : ""}</strong> asignado{cantClientes > 1 ? "s" : ""}. Al eliminarla se quitará de todos ellos. ¿Confirmás?
                    </span>
                ) : `¿Confirmás la eliminación de "${etiqueta.nombreEtiqueta}"? Esta acción no se puede deshacer.`
            }
            icon={ICONS.trash}
            iconVariant="danger"
            size="sm"
            actions={[{
                label:   "Eliminar",
                onClick: onConfirm,
                variant: "danger",
            }]}
        />
    );
}