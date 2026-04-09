@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByCuota_Credito_Id(Long creditoId); // Para el GET pagos de un crédito
}