import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import{BuscarEtiquetasThunk, CrearEtiquetaThunk} from "../../store/EtiquetaSlice";

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
    const navigate = useNavigate();
    const { showToast }  = useToast();
    const dispatch = useDispatch(); 

    
    const { 
        etiquetas, 
        loading: isLoading, 
        error, 
        totalPaginas: totalPages 
    } = useSelector(state => state.etiquetas);

    const [modalCrear, setModalCrear] = useState(false);

    const page   = parseInt(searchParams.get("pagina") ?? "0", 10);
    const nombre = searchParams.get("nombre") ?? undefined; 
    const color  = searchParams.get("color")  ?? undefined;  

    // Dispatcher de carga inicial y re-triggers
    useEffect(() => { 
        dispatch(BuscarEtiquetasThunk({
            pagina: page, 
            tamanio: 10,
            ...(nombre && { nombre }),
            ...(color  && { color  }),
        }));
    }, [dispatch, page, nombre, color]);

    // Dispatcher de creación
    const handleCrearEtiqueta = async (form) => {
        try {
            // Usamos unwrap() para interceptar la respuesta exitosa cruda
            const etiqueta = await dispatch(CrearEtiquetaThunk({
                nombreEtiqueta:      form.nombre,
                colorEtiqueta:       form.color,
                descripcionEtiqueta: form.descripcion,
            })).unwrap(); 
            
            showToast("Etiqueta creada correctamente", "success");
            setModalCrear(false);
            // Dependiendo de tu backend, el ID podría venir como 'id' o 'etiquetaId'
            navigate(`/etiquetas/${etiqueta.id || etiqueta.etiquetaId}`);

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
                isEmpty={!etiquetas?.length}
                error={error}
                currentPage={page}
                totalPages={totalPages}
                onCreate={() => setModalCrear(true)}
            >
                {etiquetas?.map(e => (
                    <FichaEtiqueta key={e.etiquetaId || e.id} etiqueta={e} />
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