package com.uade.tp13.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {   

    // Handler para excepciones de negocio custom
    @ExceptionHandler({CuotaYaPagadaException.class, CreditoFinalizadoException.class})
    public ResponseEntity<ErrorResponse> handleBusinessExceptions(BusinessException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(409, "Conflicto de Negocio", List.of(ex.getMessage())));
    }

    // Controladores de excepciones mas generales 

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            new ErrorResponse(404, "No encontrado", List.of(ex.getMessage()))
        );
    }

    @ExceptionHandler(InvalidStateException.class) 
    public ResponseEntity<ErrorResponse> handleInvalidState(InvalidStateException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(409, "Estado Invalido", List.of(ex.getMessage())));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleGenericBusiness(BusinessException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            new ErrorResponse(400, "Error de negocio", List.of(ex.getMessage()))
        );
    }

    // Captura errores de @Valid en los request
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errores = ex.getBindingResult().getFieldErrors().stream()
            .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
            .toList();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            new ErrorResponse(400, "Error de validación", errores)
        );
    }

    @ExceptionHandler(Exception.class) // generico
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            new ErrorResponse(500, "Error interno", List.of(ex.getMessage()))
        );
    }
}
