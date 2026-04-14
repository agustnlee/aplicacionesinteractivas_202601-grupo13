package com.uade.tp13.exception;

public class CuotaYaPagadaException extends BusinessException {
    public CuotaYaPagadaException(Long cuotaId) {
        super("La cuota " + cuotaId + " ya fue pagada");
    }
}