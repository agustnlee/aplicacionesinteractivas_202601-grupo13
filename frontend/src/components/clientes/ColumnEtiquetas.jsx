import { useState, useEffect } from "react";
import { obtenerEtiquetaPorCliente } from "../../api/apiClienteEtiquetas";
import { obtenerEtiquetaPorId } from "../../api/apiEtiquetas";
import { Link } from "react-router-dom";

export default function ColumnEtiquetas({ clienteId }) {
    const [etiquetas, setEtiquetas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const cargar = async () => {
            setIsLoading(true);
            try {
                // Recorrer todas las páginas
                let pagina = 0;
                let todasLasRelaciones = [];
                while (true) {
                    const resp = await obtenerEtiquetaPorCliente(clienteId, { pagina, tamanio: 20 });
                    const relaciones = resp.content ?? [];
                    todasLasRelaciones = [...todasLasRelaciones, ...relaciones];
                    if (pagina + 1 >= (resp.totalPages ?? resp.totalPaginas ?? 1)) break;
                    pagina++;
                }

                if (!todasLasRelaciones.length) {
                    if (mounted) setEtiquetas([]);
                    return;
                }

                const detalles = await Promise.all(
                    todasLasRelaciones.map((r) => obtenerEtiquetaPorId(r.etiquetaId))
                );
                if (mounted) setEtiquetas(detalles);
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
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", alignItems: "center" }}>
            {etiquetas.map((et) => (
                <Link
                    key={et.etiquetaId}
                    to={`/etiquetas/${et.etiquetaId}`}
                    title={et.nombreEtiqueta}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 9px",
                        borderRadius: "9999px",
                        border: "1.5px solid var(--primary-500)",
                        backgroundColor: et.colorEtiqueta ?? "var(--primary-500)",
                        textDecoration: "none",
                        color: "var(--primary-50)",
                        fontSize: "var(--text-xs)",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                    }}
                >
                    {et.nombreEtiqueta}
                </Link>
            ))}
        </div>
    );
}