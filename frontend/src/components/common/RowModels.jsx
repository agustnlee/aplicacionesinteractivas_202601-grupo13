// Destinado para el listado de los models, exepto etiqueta
import styles from './RowModels.module.css';

export default function RowModels({ item, columns, actions }) {
    return (
        <div className={styles.fila}>
            <div className={styles.columnasContainer}>
                {columns.map((col, index) => (
                    <div 
                    key={`${col.key}-${index}`} 
                    className={styles.celda} 
                    style={{ width: col.width || 'auto' }}>
                        {col.render ? col.render(item) : item[col.key]}
                    </div>
                ))}
            </div>

            {actions && actions.length > 0 && (
                <div className={styles.acciones}>
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`btn btn-${action.variant || 'ghost'}`}
                            onClick={() => action.onClick(item)}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}