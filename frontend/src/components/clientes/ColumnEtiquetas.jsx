import { useState, useEffect } from "react";
import { obtenerEtiquetaPorCliente } from "../../api/apiClienteEtiquetas";
import { Link } from "react-router-dom";

export default function ColumnEtiquetas({ clienteId }) {
    const [etiquetas, setEtiquetas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const cargar = async () => {
            setIsLoading(true);
            try {
                let pagina = 0;
                let todas = [];
                while (true) {
                    const resp = await obtenerEtiquetaPorCliente(clienteId, { pagina, tamanio: 20 });
                    const items = resp.content ?? resp.contenido ?? [];
                    todas = [...todas, ...items];
                    const totalPaginas = resp.totalPages ?? resp.totalPaginas ?? 1;
                    if (pagina + 1 >= totalPaginas) break;
                    pagina++;
                }
                if (mounted) setEtiquetas(todas);
            } catch {
                if (mounted) setEtiquetas([]);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };
        cargar();
        return () => { mounted = false; };
    }, [clienteId]);

    if (isLoading) return (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontStyle: "italic" }}>
            Cargando...
        </span>
    );

    if (!etiquetas.length) return (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>—</span>
    );

    return (
    <div style={{
        display: "flex",
        gap: "5px",
        flexWrap: "nowrap",
        alignItems: "center",
        overflowX: "auto",
        paddingTop: "4px",
        paddingBottom: "4px",
        scrollbarWidth: "none",
        maxWidth: "360px",
    }}>
        {etiquetas.map((et) => (
            <Link
                key={et.id}
                to={`/etiquetas/${et.etiquetaId}`}
                title={et.nombreEtiqueta}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "3px 9px",
                    borderRadius: "9999px",
                    border: "1.5px solid var(--primary-50)",
                    backgroundColor: et.colorEtiqueta ?? "var(--primary-500)",
                    textDecoration: "none",
                    color: "var(--primary-50)",
                    fontSize: "var(--text-xs)",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                {et.nombreEtiqueta}
            </Link>
        ))}
    </div>
);
}