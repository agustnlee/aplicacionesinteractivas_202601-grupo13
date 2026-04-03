package com.uade.tp13.exception;

import java.math.BigDecimal;

// TODO: Confirmar si se va a agregar pago parcial, sino borrar. 
public class PagoParcialException extends RuntimeException {
    public PagoParcialException(BigDecimal esperado, BigDecimal recibido) {
        super("Pago parcial no permitido. Esperado: " + esperado + ", recibido: " + recibido);
    }
}
