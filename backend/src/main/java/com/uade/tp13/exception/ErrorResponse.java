package com.uade.tp13.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResponse {

    private int status;
    private String error;
    private List<String> mensajes;
    private LocalDateTime timestamp;

    public ErrorResponse(int status, String error, List<String> mensajes) {
        this.status = status;
        this.error = error;
        this.mensajes = mensajes;
        this.timestamp = LocalDateTime.now();
    }
}
