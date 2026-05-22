import React, { useState } from 'react';
import Modal from '../common/Modal'; 

export default function ModalCrearCredito({ isOpen, onClose, onConfirm }) {
  const [step, setStep] = useState(1);
  const [monto, setMonto] = useState('');
  const [cuotas, setCuotas] = useState('');

  // Corrección: Resetea todos los inputs de texto al cerrar el flujo completo
  const handleCloseFull = () => {
    setStep(1);
    setMonto('');
    setCuotas('');
    onClose();
  };

  const accionesPaso1 = [
    {
      label: "Ver Preview",
      onClick: () => { if (monto && cuotas) setStep(2); },
      variant: "primary",
      disabled: !monto || !cuotas
    }
  ];

  const accionesPaso2 = [
    {
      label: "Confirmar y Crear",
      onClick: () => {
        onConfirm({ monto, cuotas });
        handleCloseFull();
      },
      variant: "success"
    }
  ];

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

  const montoCuotaCalculado = cuotas > 0 ? (Number(monto) / Number(cuotas)) : 0;

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
        <p><strong>Monto aproximado por cuota:</strong> ${montoCuotaCalculado.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p style={{ color: 'var(--text-muted, #666)', fontSize: '0.85rem', marginTop: '15px' }}>
          * Al confirmar se impactará el registro en el sistema y se redirigirá al detalle único.
        </p>
      </div>
    </Modal>
  );
}