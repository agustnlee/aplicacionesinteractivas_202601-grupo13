import React, { useState } from 'react';
import Modal from '../common/Modal'; // Asegurate de que la ruta a tu Modal.jsx sea la correcta

export default function ModalCrearCredito({ isOpen, onClose, onConfirm }) {
  const [step, setStep] = useState(1);
  const [monto, setMonto] = useState('');
  const [cuotas, setCuotas] = useState('');

  // Al cerrar el flujo completo, reseteamos el paso a 1
  const handleCloseFull = () => {
    setStep(1);
    onClose();
  };

  // Acciones para el PASO 1 (Formulario)
  const accionesPaso1 = [
    {
      label: "Ver Preview",
      onClick: () => { if (monto && cuotas) setStep(2); },
      variant: "primary",
      disabled: !monto || !cuotas
    }
  ];

  // Acciones para el PASO 2 (Preview / Resumen)
  const accionesPaso2 = [
    {
      label: "Confirmar y Crear",
      onClick: () => {
        // Ejecuta la función de confirmación pasándole los datos
        onConfirm({ monto, cuotas });
        handleCloseFull();
      },
      variant: "success"
    }
  ];

  // APROVECHAMOS EL BOTÓN "VOLVER" DEL MODAL BASE:
  // Si está en el paso 2, volver lo regresa al paso 1. Si está en el paso 1, cierra el modal.
  const handleVolverClick = step === 2 ? () => setStep(1) : handleCloseFull;

  if (step === 1) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleVolverClick}
        title="Crear Nuevo Crédito"
        description="Complete los campos para procesar la solicitud (CrearCreditoRequest)"
        size="md"
        actions={accionesPaso1}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Monto Solicitado</label>
            <input 
              type="number" 
              className="form-control" 
              value={monto} 
              onChange={(e) => setMonto(e.target.value)} 
              placeholder="Ej: 55000" 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Cantidad de Cuotas</label>
            <input 
              type="number" 
              className="form-control" 
              value={cuotas} 
              onChange={(e) => setCuotas(e.target.value)} 
              placeholder="Ej: 12" 
            />
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleVolverClick}
      title="Plan de Cuotas (Review)"
      description="Revise las condiciones calculadas antes de confirmar la creación"
      size="md"
      actions={accionesPaso2}
    >
      <div style={{ lineHeight: '2', padding: '10px 0' }}>
        <p><strong>Monto Total Solicitado:</strong> ${Number(monto).toLocaleString()}</p>
        <p><strong>Plazo Estimado:</strong> {cuotas} meses</p>
        <p><strong>Monto aproximado por cuota:</strong> ${(monto / cuotas).toFixed(2).toLocaleString()}</p>
        <p style={{ color: 'var(--text-muted, #666)', fontSize: '0.85rem', marginTop: '15px' }}>
          * Al confirmar se impactará el registro en el sistema y se redirigirá al detalle único.
        </p>
      </div>
    </Modal>
  );
}