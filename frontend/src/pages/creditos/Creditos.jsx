import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FichaCredito from "../../components/creditos/FichaCredito";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import { getCreditos } from '../../api/creditoApi';
import styles from '../PagesDetail.module.css';


const FIELDS = [
    { key: "id",         label: "ID",          type: "number" },
    { key: "estado",     label: "Estado",       type: "select", options: [
        { value: "ACTIVO",                   label: "Activo"                   },
        { value: "EN_MORA",                  label: "En mora"                  },
        { value: "CERRADO",                  label: "Cerrado"                  },
        { value: "CANCELADO",                label: "Cancelado"                },
        { value: "CANCELADO_REFINANCIACION", label: "Cancelado refinanciación" },
    ]},
];


const COLUMNS = [
    { label: "ID",       width: "60px"  },
    { label: "Cliente",  width: "130px" },
    { label: "Cobrador", width: "130px" },
    { label: "Monto",    width: "110px" },
    { label: "Cuotas",   width: "80px"  },
    { label: "Interés",  width: "80px"  },
    { label: "Fecha",    width: "110px" },
    { label: "Estado",   width: "140px" },
];



export default function Creditos() {
  const [searchParams] = useSearchParams();
  
  // Estado para el cargador (en false para que muestre los datos de una en la captura)
  const [isLoading, setIsLoading] = useState(false);
  const [creditos,   setCreditos]   = useState([]);
  const [error,      setError]      = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const page   = parseInt(searchParams.get("pagina") ?? "0", 10);
  const id          = searchParams.get("id")   ?? undefined;
  const estado      = searchParams.get("estado")  ?? undefined;
  const cobradorId  = searchParams.get("cobradorId") ?? undefined;
  const clienteId   = searchParams.get("clienteId")   ?? undefined;
  const creadoPorId = searchParams.get("creadoPorId") ?? undefined;   

  // carga inicial
  useEffect(() => {
        const cargar = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getCreditos({
                    ...(id  && { id }),
                    ...(estado && { estado}),
                    ...(cobradorId  && { cobradorId  }),
                    ...(clienteId   && { clienteId   }),
                    ...(creadoPorId && { creadoPorId }),
                    pagina:  page,
                    tamanio: 10,
                });
                setCreditos(data.contenido);
                setTotalPages(data.totalPaginas);
            } catch (e) {
                setError(e?.mensajes?.[0] ?? "Error al cargar créditos");
            } finally {
                setIsLoading(false);
            }
        };
        cargar();
    }, [page, id, estado, cobradorId, clienteId, creadoPorId]);


  return (
    <div className={`${styles.page} ${!isLoading ? "" : "is-loading"}`}>
        <h2 className="title">Listado de Créditos</h2>
        <PaginatedContainer
            fields={FIELDS}
            columns={COLUMNS}
            isLoading={isLoading}
            isEmpty={!creditos.length}
            error={error}
            currentPage={page}
            totalPages={totalPages}
        >
            {creditos?.map(c => c?.id ? <FichaCredito key={c.id} credito={c} /> : null)}
        </PaginatedContainer>
    </div>
  );

}