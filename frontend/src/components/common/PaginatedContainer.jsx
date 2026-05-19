import { useSearchParams } from 'react-router-dom';
import FilterSearch from './FilterSearch';
import RowHeader from './RowHeader';
import LoadingWrapper from './LoadingWrapper';
import styles from './PaginatedContainer.module.css';

export default function PaginatedContainer({ 
    title, 
    fields, 
    currentPage, 
    totalPages, 
    isLoading,
    isEmpty,
    error,
    children,
    onCreate,
    columns,
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
                {title && <h2 className="title">{title}</h2>}
                {fields && fields.length > 0 && <FilterSearch fields={fields} onCreate={onCreate} />}
            </div>

            <div className={styles.content}>
                <LoadingWrapper isLoading={isLoading} isEmpty={isEmpty} error={error}>

                    {columns && (
                        <RowHeader columns={columns} />
                    )}

                    <div className={styles.list}>
                        {children}
                    </div>
                </LoadingWrapper>
            </div>

            {!isLoading && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button 
                        disabled={currentPage <= 0} 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`btn ${styles.paginationBtn}`} 
                    >
                        Anterior
                    </button>
                    <span className={styles.paginationText}>
                        Página {currentPage + 1} de {totalPages}
                    </span>
                    <button 
                        disabled={currentPage >= totalPages - 1} 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`btn ${styles.paginationBtn}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}