import React from 'react';
import { Link } from 'react-router-dom';

const FichaCredito = ({ credito }) => {
  // Desestructuramos lo que viene del objeto credito
  const { id, monto, fechaInicio, fechaFin, clienteNombre, estado } = credito;

  return (
    <tr>
      <td>
        {/* Al hacer clic en el ID, nos lleva al detalle del crédito */}
        <Link to={`/creditos/${id}`}>{id}</Link>
      </td>
      <td>${monto}</td>
      <td>{fechaInicio}</td>
      <td>{fechaFin}</td>
      <td>{clienteNombre}</td>
      <td>
        <span className="estado-tag">
          {estado}
        </span>
      </td>
    </tr>
  );
};

export default FichaCredito;