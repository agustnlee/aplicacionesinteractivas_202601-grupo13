import React from 'react';

const FichaCuota = ({ cuota, onPagar }) => {
  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '12px' }}>{cuota.idCuota}</td>
      <td>{cuota.fechaVencimiento}</td>
      <td>${cuota.monto.toLocaleString()}</td>
      <td style={{ 
        color: cuota.pagada ? '#2e7d32' : '#c62828', 
        fontWeight: 'bold' 
      }}>
        {cuota.pagada ? '✔ Pagada' : '✘ Pendiente'}
      </td>
      <td>
        {!cuota.pagada && onPagar && (
          <button 
            onClick={() => onPagar(cuota.idCuota)}
            style={{ 
              padding: '6px 12px', 
              cursor: 'pointer', 
              backgroundColor: '#1e3a5f', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}
          >
            Pagar
          </button>
        )}
      </td>
    </tr>
  );
};

export default FichaCuota;