package com.uade.tp13.exception;

import com.uade.tp13.enums.EstadoCredito;

public class CreditoFinalizadoException extends BusinessException {
    public CreditoFinalizadoException(EstadoCredito estado) {
        super("Operación bloqueada. El crédito está en estado: " + estado);
    }
}