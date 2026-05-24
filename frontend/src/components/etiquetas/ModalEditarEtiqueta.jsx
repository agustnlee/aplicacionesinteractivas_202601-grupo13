import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalEditarEtiqueta.module.css";

const MAX_DESC = 50;

export default function ModalEditarEtiqueta({ isOpen, etiqueta, onClose, onConfirm }) {
    const [nombre,      setNombre]      = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [shake,       setShake]       = useState(false);

    useEffect(() => {
        if (isOpen && etiqueta) {
            setNombre(etiqueta.nombreEtiqueta ?? "");
            setDescripcion(etiqueta.descripcionEtiqueta ?? "");
        }
    }, [isOpen, etiqueta]);

    const handleDescripcion = (e) => {
        if (e.target.value.length > MAX_DESC) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }
        setDescripcion(e.target.value);
    };

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

            <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Descripción</label>
                </div>
                <input
                    type="text"
                    value={descripcion}
                    onChange={handleDescripcion}
                    placeholder={etiqueta?.descripcionEtiqueta ?? "Descripción"}
                    className={`${styles.input} ${shake ? styles.shake : ""}`}
                />
                <span className={`${styles.counter} ${descripcion.length >= MAX_DESC ? styles.counterMax : ""}`}>
                    {descripcion.length}/{MAX_DESC}
                </span>
            </div>
        </Modal>
    );
}