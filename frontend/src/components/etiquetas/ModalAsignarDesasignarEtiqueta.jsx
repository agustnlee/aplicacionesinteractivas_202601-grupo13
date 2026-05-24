import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalAsignarDesasignarEtiqueta.module.css";

export default function ModalAsignarDesasignarEtiqueta({ isOpen, onClose, onAsignar, onDesasignar }) {
    const [clienteId, setClienteId] = useState("");
    const [tab,       setTab]       = useState("asignar"); // "asignar" | "desasignar"

    useEffect(() => {
        if (!isOpen) { setClienteId(""); setTab("asignar"); }
    }, [isOpen]);

    const handleConfirm = () => {
        const parsed = parseInt(clienteId);
        if (!clienteId || isNaN(parsed) || parsed <= 0) return;
        tab === "asignar" ? onAsignar(parsed) : onDesasignar(parsed);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Gestionar asignación"
            icon={ICONS.tag}
            iconVariant="default"
            size="sm"
            actions={[{
                label:    tab === "asignar" ? "Asignar" : "Desasignar",
                onClick:  handleConfirm,
                variant:  tab === "asignar" ? "primary" : "danger",
                disabled: !clienteId.trim(),
            }]}
        >
            <div className={styles.tabs}>
                <button
                    type="button"
                    className={`${styles.tab} ${tab === "asignar" ? styles.tabActive : ""}`}
                    onClick={() => setTab("asignar")}
                >
                    Asignar
                </button>
                <button
                    type="button"
                    className={`${styles.tab} ${tab === "desasignar" ? styles.tabActiveDanger : ""}`}
                    onClick={() => setTab("desasignar")}
                >
                    Desasignar
                </button>
            </div>

            <ModalForm
                label="ID Cliente"
                name="clienteId"
                value={clienteId}
                onChange={e => setClienteId(e.target.value)}
                type="number"
                placeholder="Ej: 5"
            />
        </Modal>
    );
}