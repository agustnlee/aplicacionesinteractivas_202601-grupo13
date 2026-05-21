import { useState } from "react";
import Modal from "../../components/common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalPago.module.css";

const METODOS = ["EFECTIVO", "TARJETA", "TRANSFERENCIA", "OTRO"];

export default function ModalPago({ isOpen, cuota, onClose, onConfirm }) {
    const [metodo, setMetodo]               = useState("EFECTIVO");
    const [observaciones, setObservaciones] = useState("");

    const handleConfirm = () => onConfirm(cuota?.id, metodo, observaciones);
    const handleClose   = () => { setMetodo("EFECTIVO"); setObservaciones(""); onClose(); };

    if (!cuota) return null;

    const montoMostrar = cuota.montoTotal ?? cuota.monto;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={`Registrar pago — Cuota #${cuota.numeroCuota}`}
            description={`Monto a cobrar: $${montoMostrar?.toLocaleString()}`}
            icon={ICONS.CircleCheckBig}
            iconVariant="success"
            size="sm"
            actions={[{ label: "Confirmar pago", onClick: handleConfirm, variant: "success" }]}
        >
            <div className={styles.body}>
                <div className={styles.campo}>
                    <label className={styles.label}>Método de pago</label>
                    <select
                        value={metodo}
                        onChange={e => setMetodo(e.target.value)}
                        className={styles.select}
                    >
                        {METODOS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                <div className={styles.campo}>
                    <label className={styles.label}>Observaciones (opcional)</label>
                    <textarea
                        value={observaciones}
                        onChange={e => setObservaciones(e.target.value)}
                        rows={3}
                        placeholder="Ej: pagó en efectivo"
                        className={styles.textarea}
                    />
                </div>
            </div>
        </Modal>
    );
}