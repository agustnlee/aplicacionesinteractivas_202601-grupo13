import React from 'react';
import { Link } from 'react-router-dom';

const FichaCredito = ({ credito }) => {
  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '12px' }}>
        <Link to={`/creditos/${credito.id}`} style={{ color: '#007bff', fontWeight: 'bold' }}>
          #{credito.id}
        </Link>
      </td>
      <td>${credito.deudaOriginal.toLocaleString()}</td>
      <td>{credito.fecha}</td>
      <td>{credito.cantidadCuotas} cuotas</td>
      <td>${credito.importeCuota.toLocaleString()}</td>
      <td>
        <span style={{ 
          backgroundColor: '#e3f2fd', 
          color: '#1e3a5f', 
          padding: '4px 8px', 
          borderRadius: '4px', 
          fontSize: '0.85rem',
          fontWeight: '600' 
        }}>Activo</span>
      </td>
    </tr>
  );
};

export default FichaCredito;