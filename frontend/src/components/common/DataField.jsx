import styles from "./DataField.module.css";

export default function DataField({ label, value }) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}