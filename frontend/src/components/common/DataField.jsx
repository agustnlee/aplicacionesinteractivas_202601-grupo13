import styles from "./DataField.module.css";

export default function DataField({ label, value }) {
    const isEmpty = value === null || value === undefined || value === "";
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{isEmpty ? "—" : value}</span>
        </div>
    );
}