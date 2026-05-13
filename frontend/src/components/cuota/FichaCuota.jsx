import React from 'react';

const FichaCuota = ({ cuota, onPagar }) => {
  return (
    <tr>
      <td>{cuota.idCuota}</td>
      <td>{cuota.fechaVencimiento}</td>
      <td>${cuota.monto}</td>
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
            style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#1e3a5f', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Pagar
          </button>
        )}
      </td>
    </tr>
  );
};

export default FichaCuota;