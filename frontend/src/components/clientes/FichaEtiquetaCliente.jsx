import { Link } from "react-router-dom";

export default function FichaEtiquetaCliente({ etiquetas }) {
    if (!etiquetas?.length) return (
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", fontStyle: "italic" }}>
            Sin etiquetas asignadas
        </span>
    );

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "4px 0" }}>
            {etiquetas.map((et) => (
                <Link
                    key={et.idEtiqueta}
                    to={`/etiquetas/${et.idEtiqueta}`}
                    title={et.nombre}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "5px 12px",
                        borderRadius: "var(--radius-full, 9999px)",
                        border: "1.5px solid var(--primary-500)",
                        backgroundColor: et.color ?? "var(--primary-500)",
                        textDecoration: "none",
                        color: "var(--primary-50)",
                        fontSize: "var(--text-sm)",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                    }}
                >
                    {et.nombre}
                </Link>
            ))}
        </div>
    );
}