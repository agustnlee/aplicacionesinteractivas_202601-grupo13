@RestController
@RequestMapping("/api/pagos")
public class PagoController {
    
    @PostMapping("/registrar/{cuotaId}")
    public ResponseEntity<Pago> realizarPago(@PathVariable Long cuotaId, @RequestParam MetodoPago metodo) {
        return ResponseEntity.ok(cuotaService.registrarPago(cuotaId, metodo, null));
    }

    @GetMapping("/credito/{creditoId}")
    public ResponseEntity<List<Pago>> obtenerPagosPorCredito(@PathVariable Long creditoId) {
        return ResponseEntity.ok(pagoService.obtenerPagosPorCredito(creditoId));
    }
}