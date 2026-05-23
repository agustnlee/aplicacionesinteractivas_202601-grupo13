import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FichaCredito from "../../components/creditos/FichaCredito";
import ModalCrearCredito from "../../components/creditos/ModalCrearCredito";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import LoadingWrapper from "../../components/common/LoadingWrapper"; 

export default function Creditos() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para el cargador (en false para que muestre los datos de una en la captura)
  const [isLoading, setIsLoading] = useState(false);

  const mockCreditos = [
    { id: 101, deudaOriginal: 55000, fecha: '2026-05-13', cantidadCuotas: 10, importeCuota: 6000 },
    { id: 102, deudaOriginal: 120000, fecha: '2026-04-20', cantidadCuotas: 24, importeCuota: 7500 }
  ];

  const camposBusqueda = [
    { key: 'id', label: 'ID', type: 'text' },
    { key: 'deudaOriginal', label: 'Deuda Total', type: 'number' },
    { key: 'fecha', label: 'Fecha Inicio', type: 'date' }
  ];

  const handleConfirmarCreacion = (datosNuevoCredito) => {
    navigate('/creditos/101');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* El título fuera del loading*/}
      <h2 className="title" style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px' }}>Listado de Créditos</h2>

      {/* 2. Envolvemos todo el contenido dinámico con el LoadingWrapper */}
      <LoadingWrapper loading={isLoading}>
        
        {/*prop onCreate*/}
        <PaginatedContainer 
          data={mockCreditos} 
          fields={camposBusqueda}
          onCreate={() => setIsModalOpen(true)}
        >
          <div className="list-header" style={{ display: 'flex', fontWeight: 'bold', padding: '12px', borderBottom: '2px solid #eee' }}>
            <span style={{ flex: 1 }}>ID</span>
            <span style={{ flex: 1 }}>Deuda Total</span>
            <span style={{ flex: 1 }}>Fecha Inicio</span>
            <span style={{ flex: 1 }}>Plazo</span>
            <span style={{ flex: 1 }}>Monto Cuota</span>
            <span style={{ flex: 1 }}>Estado</span>
          </div>

          {mockCreditos.map(c => (
            <FichaCredito key={c.id} credito={c} />
          ))}
        </PaginatedContainer>

      </LoadingWrapper>

      <ModalCrearCredito 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmarCreacion}
      />
    </div>
  );
}