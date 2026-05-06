import styles from "./Spinner.module.css";

export default function Spinner({ size = "md"}) {
    return (
        <div className={styles.wrapper} role="status">
            <div className={`${styles.spinner} ${styles[size]}`} />
        </div>
    );
}