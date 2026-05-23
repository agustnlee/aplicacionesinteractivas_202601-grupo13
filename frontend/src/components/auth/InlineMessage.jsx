import { ICONS } from "../../utils/icontypes";
import styles from "./InlineMessage.module.css";

export default function InlineMessage({ type = "info", children, onClose }) {
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