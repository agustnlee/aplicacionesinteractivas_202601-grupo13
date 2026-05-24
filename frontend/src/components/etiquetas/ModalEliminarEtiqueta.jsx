import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";


export default function ModalEliminar({ isOpen, etiqueta, onClose, onConfirm }) {
    if (!etiqueta) return null;
   

   

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={ "eliminar etiqueta" }
            description={`¿Confirmás la eliminacion de ${etiqueta.nombre}? no podras deshacer esta accion`
                    
            }
            icon={ICONS.trash }
            iconVariant={ "danger" }
            size="sm"
            actions={[{
                label:   "Eliminar" ,
                onClick: onConfirm,
                variant: "danger" ,
            }]}
        />
    );
}