import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm";
import { ICONS } from "../../utils/icontypes";

export default function ModalEditarEtiqueta({ isOpen, etiqueta, onClose, onConfirm }) {
    const [nombre,      setNombre]      = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (isOpen && etiqueta) {
            setNombre(etiqueta.nombreEtiqueta ?? "");
            setDescripcion(etiqueta.descripcionEtiqueta ?? "");
        }
    }, [isOpen, etiqueta]);

    const handleClose = () => { setNombre(""); setDescripcion(""); onClose(); };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Editar etiqueta"
            icon={ICONS.edit}
            iconVariant="default"
            size="sm"
            actions={[{
                label:    "Confirmar",
                onClick:  () => onConfirm({ nombre, descripcion }),
                variant:  "primary",
                disabled: !nombre.trim(),
            }]}
        >
            <ModalForm
                label="Nombre"
                name="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder={etiqueta?.nombreEtiqueta ?? "Nombre"}
            />
            <ModalForm
                label="Descripción"
                name="descripcion"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                placeholder={etiqueta?.descripcionEtiqueta ?? "Descripción"}
            />
        </Modal>
    );
}