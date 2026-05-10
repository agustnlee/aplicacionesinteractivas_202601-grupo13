import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import styles from './FilterSearch.module.css';

export default function FilterSearch({ fields }) {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const activeKeyInUrl = fields.find(f => searchParams.has(f.key))?.key;
    const [selectedKey, setSelectedKey] = useState(activeKeyInUrl || fields[0]?.key);
    const [inputValue, setInputValue] = useState(searchParams.get(activeKeyInUrl) || '');

    const debouncedValue = useDebounce(inputValue, 500);

    const handleKeyChange = (e) => {
        setSelectedKey(e.target.value);
        setInputValue('');
    };
    
    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);

        fields.forEach(f => delete currentParams[f.key]);

        if (debouncedValue !== '') {
            currentParams[selectedKey] = debouncedValue;
            currentParams.pagina = 0; 
        }

        setSearchParams(currentParams);
    }, [debouncedValue, selectedKey]);

    const handleReset = () => {
        setInputValue('');
        setSearchParams({ pagina: 0 }); 
    };

    const currentField = fields.find(f => f.key === selectedKey);
    const isFilterActive = fields.some(f => searchParams.has(f.key));

    return (
        <div className={styles.filterContainer}>
            <select value={selectedKey} onChange={handleKeyChange} className={styles.selectField}>
                {fields.map(field => (
                    <option key={field.key} value={field.key}>{field.label}</option>
                ))}
            </select>

            {currentField?.type === 'select' ? (
                <select value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={styles.selectField}>
                    <option value="">Todos</option>
                    {currentField.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={currentField?.type || 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Filtrar por ${currentField?.label.toLowerCase()}...`}
                    className={styles.textInput}
                />
            )}

            {isFilterActive && (
                <button type="button" onClick={handleReset} className="btn btn-ghost">
                    Limpiar
                </button>
            )}
        </div>
    );
}