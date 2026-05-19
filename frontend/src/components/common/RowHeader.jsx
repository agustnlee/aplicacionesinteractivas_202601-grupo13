import styles from './RowModels.module.css';

export default function RowHeader({ columns}) {
    return (
        <div className={styles.fila} style={{ 
            backgroundColor: 'transparent', 
            border: 'none', 
            borderBottom: '1px solid var(--border)', 
            paddingBottom: '0.5rem', 
            marginBottom: '1rem',
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

        </div>
    );
}