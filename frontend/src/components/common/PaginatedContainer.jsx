import { useSearchParams } from 'react-router-dom';
import FilterSearch from './FilterSearch';
import styles from './PaginatedContainer.module.css';
import Spinner from '../common/Spinner';

export default function PaginatedContainer({ 
    title, 
    fields, 
    currentPage, 
    totalPages, 
    isLoading,
    isEmpty,
    children 
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage) => {
        const currentParams = Object.fromEntries([...searchParams]);
        currentParams.pagina = newPage;
        setSearchParams(currentParams);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {title && <h2>{title}</h2>}
                {fields && fields.length > 0 && <FilterSearch fields={fields} />}
            </div>

            <div className={styles.content}>
                {isLoading ? (
                    <div className={styles.loadingState}>
                        <Spinner size="lg" />
                        <p>Cargando...</p>
                    </div>
                ) : isEmpty ? (
                    <div className={styles.emptyState}>No se encontraron resultados.</div>
                ) : (
                    <div className={styles.list}>
                        {children}
                    </div>
                )}
            </div>

            {!isLoading && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button 
                        disabled={currentPage <= 0} 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="btn btn-ghost"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage + 1} de {totalPages}</span>
                    <button 
                        disabled={currentPage >= totalPages - 1} 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="btn btn-ghost"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}