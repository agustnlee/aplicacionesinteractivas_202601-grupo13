import { createContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import styles from "./Toast.module.css";

export const ToastContext = createContext(null);
const MAX_TOASTS = 4;

const VARIANTS = {
    success: { icon: CheckCircle, className: styles.success },
    error:   { icon: XCircle,     className: styles.error   },
    warning: { icon: AlertTriangle,className: styles.warning },
    info:    { icon: Info,         className: styles.info    },
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "info", duration = 3500) => {
        const id = crypto.randomUUID();

        setToasts(prev => {
            // limitar cantidad máxima
            const next = [...prev, { id, message, type }];
            return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
        });

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const remove = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className={styles.container}>
                {toasts.map(toast => {
                    const { icon: Icon, className } = VARIANTS[toast.type] ?? VARIANTS.info;
                    return (
                        <div key={toast.id} className={`${styles.toast} ${className}`}>
                            <Icon size={18} className={styles.toastIcon} />
                            <span className={styles.message}>{toast.message}</span>
                            <button
                                className={styles.closeBtn}
                                onClick={() => remove(toast.id)}
                                type="button"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

