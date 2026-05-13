import React from 'react';

const FichaCuota = ({ cuota, onPagar }) => {
  const { id, fechaVencimiento, monto, estado } = cuota;

  return (
    <tr>
      <td>{id}</td>
      <td>{fechaVencimiento}</td>
      <td>${monto}</td>
      <td style={{ color: estado === 'PAGADO' ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}>
        {estado}
      </td>
      <td>
        {/* Mostramos el botón de acción */}
        {estado !== 'PAGADO' && (
          <button onClick={() => onPagar(id)}>
            Registrar Pago
          </button>
        )}
      </td>
    </tr>
  );
};

export default FichaCuota;