import { useState } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";

export default function ModalAlterarEstado({ isOpen, onClose, clienteId, estadoActual, onSubmit }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmar = async () => {
        setIsLoading(true);
        try {
            await onSubmit(clienteId, !estadoActual);
            onClose();
        } catch (err) {
            console.error("El cambio de estado fue rechazado por el contenedor principal.", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const nuevoEstado = !estadoActual;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={nuevoEstado ? "Dar de alta cliente" : "Dar de baja cliente"}
            description={nuevoEstado
                ? "¿Estás seguro que deseás habilitar a este cliente? Podrá volver a operar en el sistema sin restricciones."
                : "¿Estás seguro que deseás deshabilitar a este cliente? Perderá acceso a nuevas operaciones y créditos."}
            icon={nuevoEstado ? ICONS.lockOpen : ICONS.lockClosed}
            iconVariant={nuevoEstado ? "success" : "danger"}
            actions={[
                {
                    label: isLoading ? "Procesando..." : "Confirmar",
                    onClick: handleConfirmar,
                    variant: nuevoEstado ? "success" : "danger",
                    disabled: isLoading
                }
            ]}
        />
    );
}