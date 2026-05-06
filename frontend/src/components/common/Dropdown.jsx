import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({ trigger, items }) { // items: [{ label, onClick, variant: "default"|"danger", disabled, icon }] para cada fila
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // cerrar al clickear afuera
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className={styles.wrapper} ref={ref}>
            <div onClick={() => setOpen(o => !o)} className={styles.trigger}>
                {trigger}
            </div>

            {open && (
                <div className={styles.menu}>
                    {items.map((item, i) => (
                        item === "divider"
                            ? <div key={i} className={styles.divider} />
                            : (
                                <button
                                    key={i}
                                    type="button"
                                    className={`${styles.item} ${styles[item.variant ?? "default"]}`}
                                    onClick={() => { item.onClick(); setOpen(false); }}
                                    disabled={item.disabled}
                                >
                                    {item.icon && <item.icon size={15} />}
                                    {item.label}
                                </button>
                            )
                    ))}
                </div>
            )}
        </div>
    );
}