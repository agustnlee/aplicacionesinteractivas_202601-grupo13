import { useState } from "react";
import Modal from "../../components/common/Modal";
import { Edit } from "lucide-react";
import styles from "./ModalCambiarCobrador.module.css";

export default function ModalCambiarCobrador({ isOpen, onClose, onConfirm }) {
    const [cobradorId, setCobradorId] = useState("");
    const [error, setError]           = useState("");

    const handleConfirm = () => {
        const parsed = parseInt(cobradorId);
        if (!cobradorId || isNaN(parsed) || parsed <= 0) {
            setError("Ingresá un ID de cobrador válido");
            return;
        }
        setError("");
        onConfirm(parsed);
    };

    const handleClose = () => { setCobradorId(""); setError(""); onClose(); };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Modificar cobrador"
            description="Ingresá el ID del nuevo cobrador asignado a este crédito."
            icon={Edit}
            iconVariant="default"
            size="sm"
            actions={[{ label: "Confirmar", onClick: handleConfirm, variant: "primary" }]}
        >
            <div className={styles.body}>
                <label className={styles.label}>ID Cobrador</label>
                <input
                    type="number"
                    value={cobradorId}
                    onChange={e => { setCobradorId(e.target.value); setError(""); }}
                    placeholder="Ej: 12"
                    className={`${styles.input} ${error ? styles.inputError : ""}`}
                />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        </Modal>
    );
}