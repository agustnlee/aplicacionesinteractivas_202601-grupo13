import React from 'react';
import { Link } from 'react-router-dom';

const FichaCredito = ({ credito }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justify: 'space-between', 
      padding: '16px', 
      borderBottom: '1px solid var(--border-color, #eee)', 
      alignItems: 'center' 
    }}>
      <span style={{ flex: 1 }}>
        <Link to={`/creditos/${credito.id}`} style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
          #{credito.id}
        </Link>
      </span>
      <span style={{ flex: 1 }}>${credito.deudaOriginal?.toLocaleString()}</span>
      <span style={{ flex: 1 }}>{credito.fecha}</span>
      <span style={{ flex: 1 }}>{credito.cantidadCuotas} cuotas</span>
      <span style={{ flex: 1 }}>${credito.importeCuota?.toLocaleString()}</span>
      <span style={{ flex: 1 }}>
        <span className="badge" style={{ backgroundColor: 'var(--success-light, #e3f2fd)', color: 'var(--success-color, #1e3a5f)', padding: '4px 8px', borderRadius: '4px' }}>
          Activo
        </span>
      </span>
    </div>
  );
};

export default FichaCredito;