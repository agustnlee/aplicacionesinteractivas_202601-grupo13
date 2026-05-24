import React from 'react';
import { Link } from 'react-router-dom';
import RowModels from '../common/RowModels'; 
import styles from '../../pages/PagesDetail.module.css';

const columnasConfig = [
    { 
        key: "id", 
        label: "ID", 
        width: "60px",
        render: (c) => <strong>#{c.id || c.etiquetaId || c.idEtiqueta}</strong> 
    },
    { 
        key: "nombre", 
        label: "Nombre", 
        width: "130px",
        render: (c) => {
            const idSeguro = c.id || c.etiquetaId || c.idEtiqueta;
            const nombreSeguro = c.nombre || c.nombreEtiqueta;
            return (
                <Link to={`/etiquetas/${idSeguro}`} className={styles.link}>
                    {nombreSeguro}
                </Link>
            );
        } 
    },
    { 
        key: "descripcion", 
        label: "Descripción", 
        width: "130px",
        render: (c) => {
            const descSegura = c.descripcion || c.descripcionEtiqueta;
            return descSegura ? descSegura : <span style={{ color: 'var(--text-muted)' }}>Sin descripción</span>;
        }
    },
    { 
        key: "color", 
        label: "Color", 
        width: "110px",
        render: (c) => {
            const colorSeguro = c.color || c.colorEtiqueta || "var(--border)";
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ 
                        width: "12px", 
                        height: "12px", 
                        backgroundColor: colorSeguro, 
                        borderRadius: "50%",
                        border: "1px solid rgba(0,0,0,0.1)"
                    }}/>
                    <span style={{ fontSize: "var(--text-sm)" }}>{colorSeguro}</span>
                </div>
            );
        } 
    },
];

const FichaEtiqueta = ({ etiqueta }) => {
    return (
        <RowModels 
            item={etiqueta} 
            columns={columnasConfig} 
        />
    );
};

export default FichaEtiqueta;