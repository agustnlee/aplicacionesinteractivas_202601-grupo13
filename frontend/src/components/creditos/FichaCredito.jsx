import { Link } from 'react-router-dom';
import RowModels from '../common/RowModels'; 
import styles from '../../pages/PagesDetail.module.css';


const ESTADO_BADGE = {
    ACTIVO:                   "badge badge-success",
    EN_MORA:                  "badge badge-danger",
    CANCELADO:                "badge badge-neutral",
    CANCELADO_REFINANCIACION: "badge badge-warning",
    CERRADO:                  "badge badge-info",
};

const columnasConfig = [
    { key: "id",             label: "ID",       width: "60px",
        render: (c) => <strong>#{c.id}</strong> },
    { key: "clienteNombre",  label: "Cliente",  width: "130px",
        render: (c) => <Link to={`/clientes/${c.clienteId}`} className={styles.link}>{c.clienteNombre}</Link> },
    { key: "cobradorNombre", label: "Cobrador", width: "130px",
        render: (c) => <Link to={`/usuarios/${c.cobradorId}`} className={styles.link}>{c.cobradorNombre}</Link> },
    { key: "monto",          label: "Monto",    width: "110px",
        render: (c) => `$${Number(c.monto).toLocaleString()}` },
    { key: "cantidadCuotas", label: "Cuotas",   width: "80px",
        render: (c) => `${c.cantidadCuotas} cuotas` },
    { key: "interes",        label: "Interés",  width: "80px",
        render: (c) => `${c.interes}%` },
    { key: "fechaCreacion",  label: "Fecha",    width: "110px" },
    { key: "estado",         label: "Estado",   width: "140px",
        render: (c) => (
            <span className={ESTADO_BADGE[c.estado] ?? "badge badge-neutral"}>
                {c.estado.replace(/_/g, " ")}
            </span>
        )
    },
];



const FichaCredito = ({ credito }) => {

  

  return (
    <RowModels 
      item={credito} 
      columns={columnasConfig} 
      basePath="/creditos" 
    />
  );
};

export default FichaCredito;