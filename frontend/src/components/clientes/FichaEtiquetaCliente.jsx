import { Link } from "react-router-dom";

const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 12px",
    borderRadius: "9999px",
    border: "2px solid var(--primary-50)",
    textDecoration: "none",
    color: "var(--primary-50)",
    fontSize: "var(--text-sm)",
    fontWeight: "600",
    whiteSpace: "nowrap",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    cursor: "pointer",
};

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
                    style={{ ...badgeStyle, backgroundColor: et.color ?? "var(--primary-500)" }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    {et.nombre}
                </Link>
            ))}
        </div>
    );
}