
import React, { useState , useEffect} from "react";
import { buscarEtiquetas, crearEtiqueta, obtenerEtiquetaPorId } from "../../api/apiEtiquetas";
import Button from "../../components/ui/Button";
import Spinner from "../../components/common/Spinner";


import { useSearchParams } from 'react-router-dom';

import FichaEtiqueta from "../../components/etiquetas/FichaEtiqueta";
import PaginatedContainer from "../../components/common/PaginatedContainer";

import styles from '../PagesDetail.module.css';


const FIELDS = [
    { key: "etiquetaId",  label: "ID",  type: "number" },
    { key: "nombre",   label: "NOMBRE",  type: "String" },
    { key: "descripcion",    label: "DESCRIPCION",   type: "String" },
    { key: "color",    label: "COLOR",   type: "String" },
   
];

const COLUMNS = [
    { label: "ID",       width: "60px"  },
    { label: "nombre",  width: "130px" },
    { label: "descripcion", width: "420px" },
    { label: "color",    width: "110px" },
   
];




export default function Etiquetas() {
    const [searchParams] = useSearchParams();
    

    const [etiquetas,   setEtiquetas]   = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [etiquetaData, setEtiquetaData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [error,      setError]      = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const page   = parseInt(searchParams.get("pagina") ?? "0", 10);

    const nombre = searchParams.get("nombre") ?? undefined; 
    const color  = searchParams.get("color")  ?? undefined;  

    // carga inicial + triggers
    useEffect(() => {
        const cargar = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await buscarEtiquetas({
                    pagina:  page,
                    tamanio: 10,
                    ...(nombre && { nombre }),
                    ...(color  && { color  }),
                });
                setEtiquetas(data.contenido);
                setTotalPages(data.totalPaginas);
            } catch (e) {
                setError(e?.mensajes?.[0] ?? "Error al cargar etiquetas");
            } finally {
                setIsLoading(false);
            }
        };
        cargar();
    }, [page, nombre, color]);

   
    const handleCrearEtiqueta = async () => {
        
       

        try {
            setIsLoading(true);
            
            // fetch
            
        } catch (error) {
            console.error("Falló la creación:", error);
            
        } finally {
            setIsLoading(false);
        }
    };


const handleObtenerEtiquetaPorId = async () => {
                try {
            setIsLoading(true);
            
        
            const res = await obtenerEtiquetaPorId(1);

            
            
            console.log("Etiqueta Obtenida:", res);
            
        } catch (error) {
            console.error("Falló la obtencion unica de etiqueta:", error);
            
        } finally {
            setIsLoading(false);
        }
            }; 
  



    return (
      <div style={{ padding: "20px", border: "1px dashed var(--border)", borderRadius: "var(--radius)" }}>
        { <div className={styles.page}>
                <h2 className="title">Listado de Etiquetas</h2>
                <PaginatedContainer
                    fields={FIELDS}
                    columns={COLUMNS}
                    isLoading={isLoading}
                    isEmpty={!etiquetas.length}
                    error={error}
                    currentPage={page}
                    totalPages={totalPages}
                >
                    {etiquetas?.map(c => 
                        (c?.id || c?.etiquetaId) ? (
                            <FichaEtiqueta key={c.id || c.etiquetaId} etiqueta={c} />
                        ) : null
                    )}
                </PaginatedContainer>
         </div> }   



            
            <h3>Probar Creación de Etiqueta</h3>
            
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "15px" }}>
                <Button 
                    variant="primary" 
                    onClick={handleCrearEtiqueta}
                    disabled={isLoading}
                >
                    {isLoading ? "Creando..." : "Enviar Mock Data"}
                </Button>

                {isLoading && <Spinner size="sm" />}
            


                <div>
            <Button variant="primary" onClick={handleObtenerEtiquetaPorId, () => setIsOpen(!isOpen)} ><div><p>this</p></div></Button>
                                     
                   {isOpen && (
                        <div style={{ marginTop: '15px' }}>

                            

                        </div>)}
                     
                    
                </div>  
            </div>
        </div>
    );
}