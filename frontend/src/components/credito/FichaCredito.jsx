import React from 'react';
import { Link } from 'react-router-dom';

const FichaCredito = ({ credito }) => {
  return (
    <tr>
      <td>
        <Link to={`/creditos/${credito.id}`}>#{credito.id}</Link>
      </td>
      <td>${credito.deudaOriginal}</td>
      <td>{credito.fecha}</td>
      <td>{credito.cantidadCuotas} cuotas</td>
      <td>${credito.importeCuota}</td>
      <td>
        <span style={{ fontWeight: '600', color: '#1e3a5f' }}>Activo</span>
      </td>
    </tr>
  );
};

export default FichaCredito;