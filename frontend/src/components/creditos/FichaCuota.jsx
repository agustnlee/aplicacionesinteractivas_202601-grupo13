import RowModels from "../common/RowModels";

const ESTADO_BADGE = {
    PAGADA:   "badge badge-success",
    PENDIENTE:"badge badge-warning",
    VENCIDA:  "badge badge-danger",
};

const COLUMNS = [
    { key: "numeroCuota",      width: "50px",  render: (c) => <strong>#{c.numeroCuota}</strong> },
    { key: "fechaVencimiento", width: "120px" },
    { key: "monto",            width: "100px", render: (c) => `$${c.monto.toLocaleString()}` },
    { key: "estado",           width: "110px", render: (c) => (
        <span className={ESTADO_BADGE[c.estado] ?? "badge badge-warning"}>
            {c.estado}
        </span>
    )},
    { key: "montoRecargo",     width: "100px", render: (c) =>
        c.estado === "PAGADA" || !c.montoRecargo || c.montoRecargo === 0
            ? <span style={{ color: "var(--text-disabled)", fontSize: "var(--text-md)", paddingLeft: "var(--space-2)"}}>N/A</span>
            : <span style={{ color: "var(--danger)", fontSize: "var(--text-md)", fontWeight: "var(--font-medium)" }}>
                +${c.montoRecargo.toLocaleString()}
              </span>
    },
];

export default function FichaCuota({ cuota, esFinalCredito, onPagar, onCancelarPago, onVerDetalle }) {
    const acciones = [];
    if (cuota.estado === "PAGADA")
        acciones.push({ label: "Ver Detalle", variant: "ghost", onClick: () => onVerDetalle(cuota) });

    if (!esFinalCredito) {
        if (cuota.estado === "PENDIENTE" || cuota.estado === "VENCIDA")
            acciones.push({ label: "Pagar cuota", variant: "success", onClick: () => onPagar(cuota) });
        if (cuota.estado === "PAGADA")
            acciones.push({ label: "Anular pago", variant: "danger",  onClick: () => onCancelarPago(cuota) });
    }
    

    return <RowModels item={cuota} columns={COLUMNS} actions={acciones} />;
}