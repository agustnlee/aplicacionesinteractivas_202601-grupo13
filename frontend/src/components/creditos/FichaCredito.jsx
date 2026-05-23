import React from 'react';
import RowModels from '../common/RowModels'; // Ajustá la ruta si RowModels está en otra carpeta

const FichaCredito = ({ credito }) => {
  // Definimos cómo se procesa y visualiza cada celda de la fila
  const columnasConfig = [
    { key: 'id', width: '16.6%' },
    { 
      key: 'deudaOriginal', 
      width: '16.6%', 
      render: (item) => `$${Number(item.deudaOriginal).toLocaleString()}` 
    },
    { key: 'fecha', width: '16.6%' },
    { 
      key: 'cantidadCuotas', 
      width: '16.6%', 
      render: (item) => `${item.cantidadCuotas} cuotas` 
    },
    { 
      key: 'importeCuota', 
      width: '16.6%', 
      render: (item) => `$${Number(item.importeCuota).toLocaleString()}` 
    },
    { 
      key: 'estado', 
      width: '16.6%', 
      render: () => <span className="badge success">Activo</span> 
    }
  ];

  return (
    <RowModels 
      item={credito} 
      columns={columnasConfig} 
      basePath="/creditos" 
    />
  );
};

export default FichaCredito;