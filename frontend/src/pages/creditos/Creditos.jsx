import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FichaCredito from "../../components/credito/FichaCredito";
// Simulamos las importaciones de los componentes del grupo (asegurate de que las rutas existan)
// import PaginatedContainer from "../../components/common/PaginatedContainer";
// import LoadingWrapper from "../../components/common/LoadingWrapper";

export default function Creditos() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para los Modals
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  
  // Datos simulados (Mock)
  const mockCreditos = [
    { id: 101, deudaOriginal: 55000, fecha: '2026-05-13', cantidadCuotas: 10, importeCuota: 6000 }
  ];

  // Manejadores del flujo de creación
  const handlePreview = (e) => {
    e.preventDefault();
    // Acá iría la llamada a /preview con los datos de CrearCreditoRequest
    setShowModal1(false);
    setShowModal2(true); // Saltamos al segundo modal
  };

  const handleConfirmarCreacion = () => {
    setIsLoading(true);
    // Acá iría la llamada final para crear el crédito
    setTimeout(() => {
      setIsLoading(false);
      setShowModal2(false);
      navigate('/creditos/101'); // Redirige al detalle del nuevo crédito
    }, 1000);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 1. Título con la clase que pidió Agus */}
      <h1 className="title" style={{ marginBottom: '20px' }}>Listado de Créditos</h1>

      {/* 2. LoadingWrapper rodeando el contenedor */}
      {/* <LoadingWrapper isLoading={isLoading}> */}
        
        {/* 3. Reemplazar por <PaginatedContainer> cuando lo vincules */}
        <div className="paginated-container" style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          
          <div className="list-header" style={{ display: 'flex', fontWeight: 'bold', padding: '12px', borderBottom: '2px solid #eee' }}>
            <span style={{ flex: 1 }}>ID</span>
            <span style={{ flex: 1 }}>Deuda</span>
            <span style={{ flex: 1 }}>Fecha</span>
            <span style={{ flex: 1 }}>Cuotas</span>
            <span style={{ flex: 1 }}>Monto Cuota</span>
            <span style={{ flex: 1 }}>Estado</span>
          </div>

          {mockCreditos.map(c => <FichaCredito key={c.id} credito={c} />)}
        </div>

      {/* </LoadingWrapper> */}

      {/* 4. Botón Crear debajo del contenedor */}
      <button 
        className="btn" 
        onClick={() => setShowModal1(true)}
        style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span>➕</span> Crear Crédito
      </button>

      {/* ---------------- MODAL 1: Formulario / Request ---------------- */}
      {showModal1 && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '400px' }}>
            <h3>Crear Nuevo Crédito</h3>
            <form onSubmit={handlePreview} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <input type="number" placeholder="Monto Solicitado" required className="form-control" />
              <input type="number" placeholder="Cantidad de Cuotas" required className="form-control" />
              <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal1(false)}>Cancelar</button>
                <button type="submit" className="btn">Ver Preview</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL 2: Plan de Cuotas / Review ---------------- */}
      {showModal2 && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '400px' }}>
            <h3>Review del Plan de Cuotas</h3>
            <div style={{ margin: '20px 0', lineHeight: '1.8' }}>
              <p><strong>Monto Total:</strong> $55.000</p>
              <p><strong>Monto por Cuota:</strong> $6.000</p>
              <p><strong>Plazo:</strong> 10 meses</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
              <button type="button" className="btn-secondary" onClick={() => { setShowModal2(false); setShowModal1(true); }}>Atrás</button>
              <button type="button" className="btn" onClick={handleConfirmarCreacion}>Confirmar y Crear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}