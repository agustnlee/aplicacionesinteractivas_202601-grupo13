import { useState } from "react";
import Modal from "../../components/common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalCancelarCredito.module.css";

const MOTIVOS = [
    { value: "CANCELADO",                label: "Cancelación directa"  },
    { value: "CANCELADO_REFINANCIACION", label: "Por refinanciación"   },
];

export default function ModalCancelarCredito({ isOpen, onClose, onConfirm }) {
    const [motivo, setMotivo] = useState("");
    const [error, setError]   = useState("");

    const handleConfirm = () => {
        if (!motivo) { setError("Seleccioná un motivo"); return; }
        setError("");
        onConfirm(motivo);
    };

    const handleClose = () => { setMotivo(""); setError(""); onClose(); };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Cancelar crédito"
            description="Esta acción no se puede deshacer. Seleccioná el motivo de cancelación."
            icon={ICONS.trash}
            iconVariant="danger"
            size="sm"
            actions={[{ label: "Cancelar crédito", onClick: handleConfirm, variant: "danger" }]}
        >
            <div className={styles.body}>
                {MOTIVOS.map(m => (
                    <label
                        key={m.value}
                        className={`${styles.opcion} ${motivo === m.value ? styles.opcionActiva : ""}`}
                    >
                        <input
                            type="radio"
                            name="motivo"
                            value={m.value}
                            checked={motivo === m.value}
                            onChange={() => { setMotivo(m.value); setError(""); }}
                            className={styles.radio}
                        />
                        {m.label}
                    </label>
                ))}
                {error && <span className={styles.error}>{error}</span>}
            </div>
        </Modal>
    );
}