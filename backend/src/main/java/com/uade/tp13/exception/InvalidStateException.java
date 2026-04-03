package com.uade.tp13.exception;

public class InvalidStateException extends RuntimeException{
    public InvalidStateException(String mensaje) {
        super(mensaje);
    }
}
