import React from 'react';
import { Link } from 'react-router-dom';

const FichaCredito = ({ credito }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '16px', 
      borderBottom: '1px solid #eee', 
      alignItems: 'center' 
    }}>
      <span style={{ flex: 1 }}>
        <Link to={`/creditos/${credito.id}`} style={{ fontWeight: 'bold' }}>
          #{credito.id}
        </Link>
      </span>
      <span style={{ flex: 1 }}>${credito.deudaOriginal?.toLocaleString()}</span>
      <span style={{ flex: 1 }}>{credito.fecha}</span>
      <span style={{ flex: 1 }}>{credito.cantidadCuotas} cuotas</span>
      <span style={{ flex: 1 }}>${credito.importeCuota?.toLocaleString()}</span>
      <span style={{ flex: 1 }}>
        <span className="badge success">Activo</span>
      </span>
    </div>
  );
};

export default FichaCredito;