import { Link } from 'react-router-dom';
import styles from './RowModels.module.css';

export default function RowModels({ item, columns, basePath, actions, tags }) {
    return (
        <div className={styles.fila}>
            <div className={styles.columnasContainer}>
                {columns.map(col => (
                    <div key={col.key} className={styles.celda} style={{ width: col.width }}>
                        {basePath && col.key === 'id' ? (
                            <Link to={`${basePath}/${item.id}`} className={styles.linkPrimary}>
                                {item[col.key]}
                            </Link>
                        ) : col.render ? (
                            col.render(item)
                        ) : (
                            item[col.key]
                        )}
                    </div>
                ))}

                {tags && (
                    <div className={styles.tagsZone}>
                        {(item[tags] ?? []).map(etiqueta => (
                            <Link
                                key={etiqueta.id}
                                to={`/etiquetas/${etiqueta.id}`}
                                className="badge"
                                style={{ backgroundColor: etiqueta.color ?? 'transparent', flexShrink: 0, textDecoration: 'none' }}
                            >
                                {etiqueta.nombre}
                            </Link>
                        ))}
                    </div>
                )}
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