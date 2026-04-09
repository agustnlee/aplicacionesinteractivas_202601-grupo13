// Registrar Pago (HU16)
public Pago registrarPago(Long cuotaId, MetodoPago metodo, String observaciones) {
    Cuota cuota = cuotaRepository.findById(cuotaId).orElseThrow();
    
    Pago pago = Pago.builder()
            .cuota(cuota)
            .monto(cuota.getMonto().add(cuota.getMontoRecargo()))
            .metodo(metodo)
            .observaciones(observaciones)
            .build();
            
    cuota.setEstado(EstadoCuota.PAGADA); // Actualiza estado cuota
    cuotaRepository.save(cuota);
    
    // llamar a un método que verifique si el crédito se debe cerrar
    return pagoRepository.save(pago);
}

// Cancelar Pago (Bajar un pago)
public void cancelarPago(Long pagoId) {
    Pago pago = pagoRepository.findById(pagoId).orElseThrow();
    Cuota cuota = pago.getCuota();
    
    cuota.setEstado(EstadoCuota.PENDIENTE); // O VENCIDA si la fecha ya pasó
    cuotaRepository.save(cuota);
    
    pagoRepository.delete(pago);
}