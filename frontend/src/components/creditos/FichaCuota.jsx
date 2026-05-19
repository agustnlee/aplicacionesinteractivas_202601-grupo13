import styles from "./FichaCuota.module.css";

const ESTADO_STYLE = {
    PAGADA:   { color: "var(--success)", bg: "var(--success-bg)", border: "var(--success-border)" },
    PENDIENTE:{ color: "var(--warning)", bg: "var(--warning-bg)", border: "var(--warning-border)" },
    VENCIDA:  { color: "var(--danger)",  bg: "var(--danger-bg)",  border: "var(--danger-border)"  },
};

export default function FichaCuota({ cuota, esFinalCredito, onPagar, onCancelarPago }) {
    const style = ESTADO_STYLE[cuota.estado] ?? ESTADO_STYLE.PENDIENTE;

    return (
        <div className={styles.row}>
            <div className={styles.datos}>
                <span className={styles.numero}>#{cuota.numeroCuota}</span>
                <span className={styles.dato}>Vence: {cuota.fechaVencimiento}</span>
                <span className={styles.dato}>${cuota.monto.toLocaleString()}</span>
                {cuota.montoRecargo > 0 && (
                    <span className={styles.recargo}>
                        +${cuota.montoRecargo.toLocaleString()} recargo
                    </span>
                )}
                <span
                    className={styles.badge}
                    style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
                >
                    {cuota.estado}
                </span>
            </div>

            {!esFinalCredito && (
                <div className={styles.acciones}>
                    {cuota.estado === "PENDIENTE" && (
                        <button className="btn btn-success btn-sm" onClick={onPagar}>
                            Pagar
                        </button>
                    )}
                    {cuota.estado === "PAGADA" && (
                        <button className="btn btn-danger btn-sm" onClick={onCancelarPago}>
                            Anular pago
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}