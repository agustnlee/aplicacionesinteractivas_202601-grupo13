import { useParams, useNavigate } from "react-router-dom";
import { useState , useEffect, startTransition} from "react";
import { useToast } from "../../hooks/useToast";
import { obtenerEtiquetaPorId, modificarEtiqueta } from "../../api/apiEtiquetas";
import { contarClientesPorEtiqueta } from "../../api/apiClienteEtiquetas";
import ModalModifcarEtiquetaNombre from "../../components/etiquetas/ModalModificarEtiquetaNombre";
import ModalModifcarEtiquetaDescripcion from "../../components/etiquetas/ModalModificarEtiquetaDescripcion";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";
import ColorPalette from "../../components/common/ColorPalette";
import ModalAsignarEtiqueta from "../../components/etiquetas/ModalAsignarEtiqueta";

import styles from "../PagesDetail.module.css";


export default function EtiquetasDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const mockEtiqueta ={id:1, nombre: "mora", color: "#16a34a", descripcion: "blabla"}
    const mockcantUs={cant: 12};

    const [modalNombre, setModalNombre]     = useState(false);
    const [modalDescripcion, setModalDescripcion]     = useState(false);
    const[modalAsignar, setModalAsignar]= useState(false);
    const [colorPalette, setColorPalette ] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const [etiqueta, setEtiqueta]   = useState(mockEtiqueta);
    const [cantUsuarios, setCantUsuarios] = useState(0);

    /* carga inicial o redireccionamiento */
    useEffect(() => {
        if (!id) return;
        const cargar = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [data, cantidad] = await Promise.all([
                    obtenerEtiquetaPorId(id),
                    contarClientesPorEtiqueta(id),
                ]);
                setEtiqueta(data);
                setCantUsuarios(cantidad);
            } catch (e) {
                showToast("Etiqueta no encontrada", "warning");
                navigate("/etiquetas", { replace: true });
            } finally {
                setIsLoading(false);
            }
        };
        cargar();
    }, [id]);


    const handleCambiarNombre = async (nuevoNombre) => {
        try {
            const updated = await modificarEtiqueta(id, {
                nombreEtiqueta:      nuevoNombre,
                colorEtiqueta:       etiqueta.colorEtiqueta,
                descripcionEtiqueta: etiqueta.descripcionEtiqueta,
            });
            setEtiqueta(updated);
            showToast("Nombre actualizado correctamente", "success");
            setModalNombre(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar nombre", "error");
        }
    };  

    const handleCambiarDescripcion = async (nuevaDesc) => {
        try {
            const updated = await modificarEtiqueta(id, {
                nombreEtiqueta:      etiqueta.nombreEtiqueta,
                colorEtiqueta:       etiqueta.colorEtiqueta,
                descripcionEtiqueta: nuevaDesc,
            });
            setEtiqueta(updated);
            showToast("Descripción actualizada correctamente", "success");
            setModalDescripcion(false);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar descripción", "error");
        }
    };

    const handleCambiarColor = async (color) => {
        try {
            const updated = await modificarEtiqueta(id, {
                nombreEtiqueta:      etiqueta.nombreEtiqueta,
                colorEtiqueta:       color,
                descripcionEtiqueta: etiqueta.descripcionEtiqueta,
            });
            setEtiqueta(updated);
            showToast("Color actualizado correctamente", "success");
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar color", "error");
        }
    };


    return (<> 
        <div className={styles.page}>
            <h2 className={`title  ${styles.seccion}`}>Detalle de Etiqueta</h2>
        </div>    

        <LoadingWrapper isLoading={isLoading} error={error} isEmpty={!etiqueta}> 
    
        <div className={styles.card}>
            <div className={styles.filaData}>
                <DataField label="ID"          value={`#${etiqueta.etiquetaId}`} />
                <DataField label="Nombre"      value={etiqueta.nombreEtiqueta} />
                <DataField label="Descripción" value={etiqueta.descripcionEtiqueta} />
                <DataField label="Usuarios asignados" value={cantUsuarios} />
                <div style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: "var(--font-medium)" }}>
                    COLOR
                    <div style={{ padding: "4px" }} />
                    <div style={{ padding: "7px", width: "7px", backgroundColor: etiqueta.colorEtiqueta, borderRadius: "50%" }} />
                </div>
            <div style={{ color: "var(--text-muted)" , fontSize: "var(--text-xs)" , fontWeight: "var(--font-medium)"}}  > 
            <div style={{padding:"4px"}}/>
           
            </div>
                <ColorPalette onConfirm={handleCambiarColor} /> 
            </div>

            <div> cambiar nombre<Button icon="edit"  variant="ghost"  size="md"  onClick={() => setModalNombre(true)}/></div>
            <div >Cambiar descripcion<Button icon="edit"  variant="ghost"  size="md"  onClick={() => setModalDescripcion(true)}/></div> 
            <Button icon="trash" variant="danger" size="md"  >
                eliminar etiqueta
            </Button>
        </div>
  
        </LoadingWrapper>    

        <ModalModifcarEtiquetaNombre   isOpen={modalNombre}
                onClose={() => setModalNombre(false)}
                onConfirm={handleCambiarNombre}>
        </ModalModifcarEtiquetaNombre>

        <ModalAsignarEtiqueta isOpen={modalAsignar} onClose={()=> setModalAsignar(false)}></ModalAsignarEtiqueta>

        <ModalModifcarEtiquetaDescripcion isOpen={modalDescripcion}
                onClose={() => setModalDescripcion(false)}
                onConfirm={handleCambiarDescripcion}>
        </ModalModifcarEtiquetaDescripcion>

    </>);
}