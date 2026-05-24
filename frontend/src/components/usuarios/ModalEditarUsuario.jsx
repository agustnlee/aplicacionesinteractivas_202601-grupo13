import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalEditarUsuario.module.css";

const ROLES = [
    { value: "ADMIN",    label: "Admin"    },
    { value: "ANALISTA", label: "Analista" },
    { value: "COBRADOR", label: "Cobrador" },
];

export default function ModalEditarUsuario({ isOpen, usuario, onClose, onConfirm }) {
    const [nombre, setNombre] = useState("");
    const [rol,    setRol]    = useState("COBRADOR");

    useEffect(() => {
        if (isOpen && usuario) {
            setNombre(usuario.nombre ?? "");
            setRol(usuario.rol ?? "COBRADOR");
        }
    }, [isOpen, usuario]);

    const handleClose = () => { setNombre(""); onClose(); };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Editar usuario"
            icon={ICONS.edit}
            iconVariant="default"
            size="sm"
            actions={[{
                label:    "Confirmar",
                onClick:  () => onConfirm({ nombre, rol }),
                variant:  "primary",
                disabled: !nombre.trim(),
            }]}
        >
            <ModalForm
                label="Nombre"
                name="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre"
            />
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Rol</label>
                <select
                    value={rol}
                    onChange={e => setRol(e.target.value)}
                    className={styles.select}
                >
                    {ROLES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                </select>
            </div>
        </Modal>
    );
}