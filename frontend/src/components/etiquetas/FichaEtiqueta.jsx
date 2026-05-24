import { Link } from 'react-router-dom';
import RowModels from '../common/RowModels';
import styles from '../../pages/PagesDetail.module.css';

const COLUMNS = [
    { key: "etiquetaId", label: "ID", width: "60px",
        render: (c) => <strong>#{c.etiquetaId}</strong>
    },
    { key: "nombreEtiqueta", label: "Nombre", width: "130px",
        render: (c) => (
            <Link to={`/etiquetas/${c.etiquetaId}`} className={styles.link}>
                {c.nombreEtiqueta}
            </Link>
        )
    },
    { key: "descripcionEtiqueta", label: "Descripción", width: "420px",
        render: (c) => c.descripcionEtiqueta?.trim()
            ? c.descripcionEtiqueta
            : <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Sin descripción</span>
    },
    { key: "colorEtiqueta", label: "Color", width: "80px",
        render: (c) => (
            <div style={{
                width: "24px", height: "24px",
                backgroundColor: c.colorEtiqueta ?? "var(--border)",
                borderRadius: "50%",
                border: "1px solid rgba(0,0,0,0.15)",
            }} />
        )
    },
];

export default function FichaEtiqueta({ etiqueta }) {
    return <RowModels item={etiqueta} columns={COLUMNS} />;
}