import { Link } from "react-router-dom";
import RowModels from "../common/RowModels";
import { ICONS } from "../../utils/icontypes";
import styles from "../../pages/PagesDetail.module.css";


const ROL_BADGE = {
    ADMIN:    { clase: "badge badge-danger",  icono: "shieldCheck" },
    ANALISTA: { clase: "badge badge-info",    icono: "clipboardPen" },
    COBRADOR: { clase: "badge badge-neutral", icono: "atSign" },
};

const columnasConfig = [
    { key: "id", label: "ID", width: "60px",
        render: (u) => <strong>#{u.id}</strong>   
    },
    { key: "nombre", label: "Nombre", width: "160px",
        render: (u) => (
            <Link to={`/usuarios/${u.id}`} className={styles.link}>
                {u.nombre}
            </Link>
        )
    },
    { key: "email",  label: "Email",  width: "200px" },
    { key: "rol",    label: "Rol",    width: "120px",
        render: (u) => {
            const config = ROL_BADGE[u.rol];
            if (!config) return u.rol;
            const Icono = ICONS[config.icono];
            return (
                <span className={config.clase} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {Icono && <Icono size={12} />}
                    {u.rol}
                </span>
            );
        }
    },
    { key: "estado", label: "Estado", width: "100px",
        render: (u) => (
            <span className={u.estado ? "badge badge-success" : "badge badge-neutral"}>
                {u.estado ? "Activo" : "Inactivo"}
            </span>
        )
    },
];

const FichaUsuario = ({ usuario }) => (
    <RowModels
        item={usuario}
        columns={columnasConfig}
    />
);

export default FichaUsuario;