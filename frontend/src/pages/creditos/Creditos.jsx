import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FichaCredito from "../../components/credito/FichaCredito";
import ModalCrearCredito from "../../components/credito/ModalCrearCredito";
import PaginatedContainer from "../../components/common/PaginatedContainer";

export default function Creditos() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data requerida para renderizar el listado
  const mockCreditos = [
    { id: 101, deudaOriginal: 55000, fecha: '2026-05-13', cantidadCuotas: 10, importeCuota: 6000 },
    { id: 102, deudaOriginal: 120000, fecha: '2026-04-20', cantidadCuotas: 24, importeCuota: 7500 }
  ];

  // Definimos los campos que el PaginatedContainer usará para filtrar/buscar
  const camposBusqueda = ['id', 'deudaOriginal', 'fecha'];

  const handleConfirmarCreacion = (datosNuevoCredito) => {
    // Acá sucedería el fetch real con las funciones de creditoApi.
    // Al finalizar con éxito, redirige al detalle único de referencia (ej: ID 101) como pidió Agus:
    navigate('/creditos/101');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Título con la clase solicitada */}
      <h1 className="title">Listado de Créditos</h1>

      {/* Uso de la última versión de PaginatedContainer enviándole las props solicitadas */}
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

      {/* Botón de crear abajo del contenedor paginado con ícono a la izquierda */}
      <button 
        className="btn" 
        onClick={() => setIsModalOpen(true)}
        style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <span>➕</span> Crear Crédito
      </button>

      {/* Modal separado encargado de la lógica funcional */}
      <ModalCrearCredito 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmarCreacion}
      />
    </div>
  );
}