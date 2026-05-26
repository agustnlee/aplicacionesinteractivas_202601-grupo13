import { useEffect } from "react";
import { X } from "lucide-react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import styles from "./Modal.module.css";

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    icon: IconComponent,
    iconVariant = "default",
    children,
    actions,
    size = "md",
    hideBack = false,      
}) {
    useLockBodyScroll(isOpen);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} ${styles[size]}`} onClick={e => e.stopPropagation()}>

                <div className={styles.header}>
                    <div className={styles.titleRow}>
                        {IconComponent && (
                            <span className={`${styles.icon} ${styles[`icon-${iconVariant}`]}`}>
                                <IconComponent size={20} />
                            </span>
                        )}
                        <h3>{title}</h3>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} type="button">
                        <X size={18} />
                    </button>
                </div>

                {description && <p className={styles.description}>{description}</p>}

                {children && <div className={styles.body}>{children}</div>}

                {actions && actions.length > 0 && (
                    <div className={styles.footer}>
                        {!hideBack && (
                            <button type="button" className="btn btn-ghost btn-md" onClick={onClose}>
                                Volver
                            </button>
                        )}
                        {actions.map((action, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`btn btn-${action.variant ?? "primary"} btn-md`}
                                onClick={action.onClick}
                                disabled={action.disabled}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}