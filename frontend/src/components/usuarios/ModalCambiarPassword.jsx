import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalCambiarPassword.module.css";

export default function ModalCambiarPassword({ isOpen, onClose, onConfirm }) {
    const [password,     setPassword]     = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isOpen) { setPassword(""); setShowPassword(false); }
    }, [isOpen]);

    const EyeIcon = showPassword ? ICONS.eye : ICONS.eyeOff;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Cambiar contraseña"
            icon={ICONS.lock}
            iconVariant="default"
            size="sm"
            actions={[{
                label:    "Confirmar",
                onClick:  () => onConfirm(password),
                variant:  "primary",
                disabled: !password.trim(),
            }]}
        >
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Nueva contraseña</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Ingresá la nueva contraseña"
                        className={styles.passwordInner}
                    />
                    <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(p => !p)}
                    >
                        <EyeIcon size={16} />
                    </button>
                </div>
            </div>
        </Modal>
    );
}