import Spinner from "./Spinner";
import styles from "./LoadingWrapper.module.css";

export default function LoadingWrapper({ isLoading,  error, isEmpty,  emptyMessage = "No se encontraron resultados.", children }) {
    if (isLoading) return (
        <div className={styles.center}>
            <Spinner size="lg" />
        </div>
    );

    if (error) return (
        <div className={styles.error}>
            {error?.mensajes?.map((msg, i) => (
                <p key={i}>{msg}</p> )) ?? <p>Ocurrió un error inesperado.</p>}
        </div>
    );

    if (isEmpty) return (
        <div className={styles.empty}>
            <p>{emptyMessage}</p>
        </div>
    );

    return children;
}