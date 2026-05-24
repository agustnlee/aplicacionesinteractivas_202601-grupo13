import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { buscarEtiquetas, crearEtiqueta } from "../../api/apiEtiquetas";
import FichaEtiqueta from "../../components/etiquetas/FichaEtiqueta";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import ModalCrearEtiqueta from "../../components/etiquetas/ModalCrearEtiqueta";
import { useToast } from "../../hooks/useToast";
import styles from '../PagesDetail.module.css';


const FIELDS = [
    { key: "nombre", label: "Nombre", type: "text" },
];

const COLUMNS = [
    { label: "ID",          width: "60px"  },
    { label: "Nombre",      width: "130px" },
    { label: "Descripción", width: "420px" },
    { label: "Color",       width: "80px"  },
];




export default function Etiquetas() {
    const [searchParams] = useSearchParams();
    const { showToast }  = useToast();
    

    const [etiquetas,   setEtiquetas]   = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,      setError]      = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [modalCrear, setModalCrear] = useState(false);


    const page   = parseInt(searchParams.get("pagina") ?? "0", 10);
    const nombre = searchParams.get("nombre") ?? undefined; 
    const color  = searchParams.get("color")  ?? undefined;  

    // carga inicial + triggers
    const cargar = async  (showLoader = true) => {
        if (showLoader) setIsLoading(true);
        setError(null);
        try {
            const data = await buscarEtiquetas({
                pagina: page, tamanio: 10,
                ...(nombre && { nombre }),
                ...(color  && { color  }),
            });
            setEtiquetas(data.contenido);
            setTotalPages(data.totalPaginas);
        } catch (e) {
            setError(e?.mensajes?.[0] ?? "Error al cargar etiquetas");
        } finally {
            if (showLoader) setIsLoading(false);
        }
    };

    useEffect(() => { cargar(); }, [page, nombre, color]);

   
    const handleCrearEtiqueta = async (form) => {
        try {
            await crearEtiqueta({
                nombreEtiqueta:      form.nombre,
                colorEtiqueta:       form.color,
                descripcionEtiqueta: form.descripcion,
            });
            showToast("Etiqueta creada correctamente", "success");
            setModalCrear(false);
            //refetch
            await cargar(false); 

        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al crear etiqueta", "error");
        }
    }


    return (
         <div className={`${styles.page} ${!isLoading ? "" : "is-loading"}`}>
            <h2 className="title">Etiquetas</h2>
            <PaginatedContainer
                fields={FIELDS}
                columns={COLUMNS}
                isLoading={isLoading}
                isEmpty={!etiquetas.length}
                error={error}
                currentPage={page}
                totalPages={totalPages}
                onCreate={() => setModalCrear(true)}
            >
                {etiquetas.map(e => (
                    <FichaEtiqueta key={e.etiquetaId} etiqueta={e} />
                ))}
            </PaginatedContainer>

            <ModalCrearEtiqueta
                isOpen={modalCrear}
                onClose={() => setModalCrear(false)}
                onConfirm={handleCrearEtiqueta}
            />
         </div>
    );
}