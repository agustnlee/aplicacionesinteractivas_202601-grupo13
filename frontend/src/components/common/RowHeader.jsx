import styles from './RowModels.module.css';

export default function RowHeader({ columns, hasActions }) {
    return (
        <div className={styles.fila} style={{ 
            backgroundColor: 'transparent', 
            border: 'none', 
            borderBottom: '2px solid var(--border-subtle)', 
            paddingBottom: '0.5rem', 
            marginBottom: '0.5rem',
            boxShadow: 'none'
        }}>
            <div className={styles.columnasContainer}>
                {columns.map((col, index) => (
                    <div 
                        key={index} 
                        className={styles.celda} 
                        style={{ width: col.width || 'auto', fontWeight: 'bold', color: 'var(--text-muted)' }}
                    >
                        {col.label}
                    </div>
                ))}
            </div>
            
            {hasActions && (
                <div className={styles.acciones} style={{ visibility: 'hidden' }}>
                    <button className="btn btn-sm">Acciones</button>
                </div>
            )}
        </div>
    );
}