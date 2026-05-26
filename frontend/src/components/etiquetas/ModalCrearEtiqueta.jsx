import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm";
import ColorPalette from "../common/ColorPalette";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalCrearEtiqueta.module.css";

const INITIAL  = { nombre: "", descripcion: "", color: "" };
const MAX_DESC = 50;

export default function ModalCrearEtiqueta({ isOpen, onClose, onConfirm }) {
    const [form,  setForm]  = useState(INITIAL);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (!isOpen) setForm(INITIAL);
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "descripcion" && value.length > MAX_DESC) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const formValido = form.nombre.trim() && form.color;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Crear etiqueta"
            icon={ICONS.tag}
            iconVariant="default"
            size="sm"
            actions={[{
                label:    "Crear etiqueta",
                onClick:  () => onConfirm(form),
                variant:  "primary",
                disabled: !formValido,
            }]}
        >
            <div className={styles.body}>
                <ModalForm
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Moroso"
                />

                {/* Descripción con contador */}
                <div className={styles.fieldGroup}>
                    <div className={styles.labelRow}>
                        <label className={styles.label}>Descripción</label>
                    </div>
                    <input
                        type="text"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Ej: Cliente con pagos atrasados"
                        className={`${styles.input} ${shake ? styles.shake : ""}`}
                    />
                    <span className={`${styles.counter} ${form.descripcion.length >= MAX_DESC ? styles.counterMax : ""}`}>
                        {form.descripcion.length}/{MAX_DESC}
                    </span>
                </div>

                {/* Color — palette y dot alineados */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Color</label>
                    <div className={styles.colorRow}>
                        <ColorPalette
                            onConfirm={(color) => setForm(prev => ({ ...prev, color }))}
                        />
                            {form.color ? (
                                <div
                                    className={styles.colorDot}
                                    style={{ backgroundColor: form.color }}
                                />
                            ) : (
                                <span className={styles.colorHint}>Seleccioná un color</span>
                            )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}