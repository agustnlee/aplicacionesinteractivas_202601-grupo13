import { Link } from 'react-router-dom';
import styles from './RowModels.module.css';

export default function RowModels({ item, columns, basePath }) {
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
            </div>
        </div>
    );
}
