import React from 'react';
import FichaCredito from "../../components/credito/FichaCredito";
import FichaCuota from "../../components/cuota/FichaCuota";

export default function Creditos() {
  // Datos de prueba (Mock Data) para que la captura se vea prolija
  const mockCredito = { id: 101, deudaOriginal: 55000, fecha: '2026-05-13', cantidadCuotas: 10, importeCuota: 6000 };
  const mockCuota = { idCuota: '101-01', fechaVencimiento: '2026-06-15', monto: 6000, pagada: false };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#1e3a5f', marginBottom: '25px' }}>Gestión de Créditos</h2>
      
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>Mis Préstamos Activos</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f3f5', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th>Deuda Total</th>
              <th>Fecha Inicio</th>
              <th>Plazo</th>
              <th>Cuota Mensual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <FichaCredito credito={mockCredito} />
          </tbody>
        </table>

        <h3 style={{ marginTop: '40px', marginBottom: '15px', fontSize: '1.1rem' }}>Próximos Vencimientos (Vista Previa)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f3f5', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Cuota #</th>
              <th>Vencimiento</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <FichaCuota cuota={mockCuota} onPagar={(id) => alert('Procesando pago de: ' + id)} />
            <FichaCuota cuota={{...mockCuota, idCuota: '101-02', pagada: true}} />
          </tbody>
        </table>
      </div>
    </div>
  );
}