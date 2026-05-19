import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FichaCredito from "../../components/creditos/FichaCredito";
import ModalCrearCredito from "../../components/creditos/ModalCrearCredito";
import PaginatedContainer from "../../components/common/PaginatedContainer";

export default function Creditos() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Volvemos a los números puros de forma limpia
  const mockCreditos = [
    { id: 101, deudaOriginal: 55000, fecha: '2026-05-13', cantidadCuotas: 10, importeCuota: 6000 },
    { id: 102, deudaOriginal: 120000, fecha: '2026-04-20', cantidadCuotas: 24, importeCuota: 7500 }
  ];

  // CONFIGURACIÓN CORRECTA: Array de objetos con key, label y type para FilterSearch
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
      <h1 className="title">Listado de Créditos</h1>

      <PaginatedContainer 
        data={mockCreditos} 
        fields={camposBusqueda}
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

      {/* Botón de crear alineado */}
      <button 
        className="btn" 
        onClick={() => setIsModalOpen(true)}
        style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <span>➕</span> Crear Crédito
      </button>

      <ModalCrearCredito 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmarCreacion}
      />
    </div>
  );
}