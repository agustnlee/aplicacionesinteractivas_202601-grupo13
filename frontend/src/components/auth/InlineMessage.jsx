import { useEffect } from "react";
import { ICONS } from "../../utils/icontypes";
import styles from "./InlineMessage.module.css";

export default function InlineMessage({ type = "info", children, onClose, duration = 7000 }) {

    useEffect(() => {
        if (!onClose || !duration) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`${styles.message} ${styles[type]}`}>
            <span className={styles.text}>{children}</span>
            {onClose && (
                <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    <ICONS.x size={14} />
                </button>
            )}
        </div>
    );
}