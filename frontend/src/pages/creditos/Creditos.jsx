import React from 'react';
import FichaCredito from "../../components/credito/FichaCredito";
import FichaCuota from "../../components/cuota/FichaCuota";

export default function Creditos() {
  // Mock Data
  const creditoPrueba = {
    id: 101,
    deudaOriginal: 55000,
    fecha: '2026-05-13',
    cantidadCuotas: 10,
    importeCuota: 6000
  };

  const cuotaPrueba = {
    idCuota: '101-01',
    fechaVencimiento: '2026-06-15',
    monto: 6000,
    pagada: false
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1e3a5f', marginBottom: '20px' }}>Panel de Créditos</h2>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>Listado de Créditos (Vista General)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
              <th>ID</th>
              <th>Deuda</th>
              <th>Fecha</th>
              <th>Cuotas</th>
              <th>Monto Cuota</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {/*COMPONENTE */}
            <FichaCredito credito={creditoPrueba} />
          </tbody>
        </table>

        <h3 style={{ marginTop: '30px' }}>Detalle de Cuotas (Cobranzas)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
              <th>#</th>
              <th>Vencimiento</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {/* ACÁ ENTRAN TUS CUOTAS */}
            <FichaCuota cuota={cuotaPrueba} onPagar={(id) => alert('Pagando ' + id)} />
            <FichaCuota cuota={{...cuotaPrueba, idCuota: '101-02', pagada: true}} />
          </tbody>
        </table>
      </div>
    </div>
  );
}