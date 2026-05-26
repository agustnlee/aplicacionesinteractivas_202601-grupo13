import { useState, useEffect } from "react";
import { obtenerEtiquetaPorCliente} from "../../api/apiClienteEtiquetas"; 
import { obtenerEtiquetaPorId } from "../../api/apiEtiquetas"; 
import { Link } from "react-router-dom";

export default function CeldaEtiquetas({ clienteId }) {
    const [etiquetas, setEtiquetas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; 

        const cargarEtiquetas = async () => {
            setIsLoading(true);
            try {
                const respuestaRelacion = await obtenerEtiquetaPorCliente(clienteId);
                const relaciones = respuestaRelacion.content || [];

                if (relaciones.length === 0) {
                    if (isMounted) setEtiquetas([]);
                    return;
                }
                const promesasDetalles = relaciones.map(rel => obtenerEtiquetaPorId(rel.etiquetaId));
                const detalles = await Promise.all(promesasDetalles);

                if (isMounted) setEtiquetas(detalles);
            } catch (error) {
                console.error(`Error cargando etiquetas del cliente ${clienteId}:`, error);
                if (isMounted) setEtiquetas([]); 
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        cargarEtiquetas();

        return () => { isMounted = false; };
    }, [clienteId]);

    if (isLoading) {
        return (
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontStyle: "italic" }}>
                Cargando...
            </span>
        );
    }

    if (etiquetas.length === 0) {
        return (
            <span style={{ 
                color: "var(--text-muted)", 
                fontWeight: "var(--font-medium)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)"
            }}>
                    <span style={{ fontSize: "var(--text-xs)" }}>Sin etiquetas</span>
            </span>
        );
    }
    const MAX_MOSTRAR = 5;
    const etiquetasVisibles = etiquetas.slice(0, MAX_MOSTRAR);
    const etiquetasOcultas = etiquetas.length - MAX_MOSTRAR;

    return (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
            {etiquetasVisibles.map(et => (
                <Link 
                    to={`/etiquetas/${et.etiquetaId}`}
                    key={et.etiquetaId} 
                    style={{ 
                        backgroundColor: et.colorEtiqueta || "var(--surface-2)", 
                        color: "var(--text-inverse)", //DEFINIR UN COLOR IDEAL PARA RESALTAR EL LINK
                        padding: "2px 8px", 
                        borderRadius: "12px", 
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-semibold)",
                        border: "1px solid var(--border-subtle)", 
                        whiteSpace: "nowrap",
                        textDecoration: "none" 
                    }}
                    title={et.nombreEtiqueta}
                >
                    {et.nombreEtiqueta}
                </Link>
            ))}
            {etiquetasOcultas > 0 && (
            <span style={{ fontSize: "10px", padding: "2px 6px", backgroundColor: "var(--primary-500)", borderRadius: "10px", color: "var(--text-inverse)" }}>
                +{etiquetasOcultas}
            </span>
        )}
        </div>
    );
}