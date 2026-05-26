import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";

export default function ModalAlterarEstado({ isOpen, usuario, onClose, onConfirm }) {
    if (!usuario) return null;

    const activo = usuario.estado;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={activo ? "Desactivar usuario" : "Activar usuario"}
            description={
                activo
                    ? `¿Confirmás la desactivación de ${usuario.nombre}? No podrá iniciar sesión.`
                    : `¿Confirmás la activación de ${usuario.nombre}?`
            }
            icon={activo ? ICONS.trash : ICONS.check}
            iconVariant={activo ? "danger" : "success"}
            size="sm"
            actions={[{
                label:   activo ? "Desactivar" : "Activar",
                onClick: onConfirm,
                variant: activo ? "danger" : "success",
            }]}
        />
    );
}