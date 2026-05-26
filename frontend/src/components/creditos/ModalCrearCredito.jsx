import { useState } from "react";
import Modal from "../common/Modal";
import { previewCredito } from "../../api/creditoApi";

const Field = ({ label, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}>
            {label}
        </label>
        {children}
    </div>
);

export default function ModalCrearCredito({ isOpen, onClose, onConfirm, clienteId }) {
    const [step, setStep] = useState(1);
    const [preview, setPreview] = useState(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [errorPreview, setErrorPreview] = useState(null);

    const [form, setForm] = useState({
        monto: "", cantidadCuotas: "", interes: "", cobradorId: "",
    });

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    const camposCompletos = form.monto && form.cantidadCuotas && form.interes && form.cobradorId;

    const handleCloseFull = () => {
        setStep(1); setPreview(null); setErrorPreview(null);
        setForm({ monto: "", cantidadCuotas: "", interes: "", cobradorId: "" });
        onClose();
    };

    const handlePreview = async () => {
        if (!camposCompletos) return;
        setIsLoadingPreview(true); setErrorPreview(null);
        try {
            const data = await previewCredito({
                clienteId: Number(clienteId), monto: Number(form.monto),
                cantidadCuotas: Number(form.cantidadCuotas), interes: Number(form.interes),
                cobradorId: Number(form.cobradorId),
            });
            setPreview(data); setStep(2);
        } catch (err) {
            setErrorPreview(err?.mensajes?.[0] ?? "Error al calcular el preview");
        } finally { setIsLoadingPreview(false); }
    };

    const handleConfirmar = () => {
        onConfirm({
            clienteId: Number(clienteId), monto: Number(form.monto),
            cantidadCuotas: Number(form.cantidadCuotas), interes: Number(form.interes),
            cobradorId: Number(form.cobradorId),
        });
        handleCloseFull();
    };

    if (step === 1) {
        return (
            <Modal isOpen={isOpen} onClose={handleCloseFull}
                title="Crear Nuevo Crédito"
                description="Completá los campos para generar el plan de cuotas."
                size="md"
                actions={[{
                    label: isLoadingPreview ? "Calculando..." : "Ver Preview",
                    onClick: handlePreview, variant: "primary",
                    disabled: !camposCompletos || isLoadingPreview,
                }]}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <Field label="Monto solicitado ($)">
                            <input type="number" className="form-control" value={form.monto}
                                onChange={set("monto")} placeholder="Ej: 55000" min="1" />
                        </Field>
                        <Field label="Cantidad de cuotas">
                            <input type="number" className="form-control" value={form.cantidadCuotas}
                                onChange={set("cantidadCuotas")} placeholder="1 – 12" min="1" max="12" />
                        </Field>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <Field label="Tasa de interés (%)">
                            <input type="number" className="form-control" value={form.interes}
                                onChange={set("interes")} placeholder="Ej: 15" min="0" step="0.1" />
                        </Field>
                        <Field label="ID del Cobrador">
                            <input type="number" className="form-control" value={form.cobradorId}
                                onChange={set("cobradorId")} placeholder="Ej: 3" min="1" />
                        </Field>
                    </div>
                    {errorPreview && (
                        <p style={{ color: "var(--danger)", fontSize: "0.82rem", margin: 0 }}>{errorPreview}</p>
                    )}
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={handleCloseFull} hideBack
            title="Plan de cuotas — Preview"
            description="Revisá las condiciones antes de confirmar."
            size="md"
            actions={[
                { label: "Volver",            onClick: () => setStep(1), variant: "ghost"   },
                { label: "Confirmar y Crear", onClick: handleConfirmar,  variant: "success" },
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {[
                        { label: "Monto solicitado", value: `$${Number(form.monto).toLocaleString("es-AR")}` },
                        { label: "Cuotas",           value: preview?.cantidadCuotas ?? form.cantidadCuotas },
                        { label: "Interés",          value: `${form.interes}%` },
                        { label: "Valor por cuota",  value: preview ? `$${Number(preview.montoPorCuota).toLocaleString("es-AR")}` : "—" },
                        { label: "Total a pagar",    value: preview ? `$${Number(preview.montoTotal).toLocaleString("es-AR")}` : "—" },
                    ].map(({ label, value }) => (
                        <div key={label} style={{
                            flex: "1 1 120px",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-md)",
                            padding: "10px 14px",
                            background: "transparent",
                        }}>
                            <div style={{
                                fontSize: "0.72rem",
                                color: "var(--primary-700)",
                                marginBottom: "4px",
                                fontWeight: "600",
                            }}>
                                {label}
                            </div>
                            <div style={{
                                fontWeight: "700",
                                fontSize: "0.95rem",
                                color: "var(--text)",     
                            }}>
                                {value}
                            </div>
                        </div>
                    ))}
                </div>

                {preview?.cuotas?.length > 0 && (
                    <div>
                        <div style={{
                            fontSize: "0.8rem", fontWeight: "600",
                            color: "var(--primary-700)",      
                            marginBottom: "6px",
                        }}>
                            Detalle de cuotas
                        </div>
                        <div style={{
                            maxHeight: "200px", overflowY: "auto",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-md)",
                            overflow: "hidden",
                        }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "var(--primary-700)" }}>
                                        {["#", "Vencimiento", "Monto"].map(h => (
                                            <th key={h} style={{
                                                padding: "8px 12px", textAlign: "left",
                                                fontWeight: "600", color: "var(--primary-50)",
                                                position: "sticky", top: 0,
                                                backgroundColor: "var(--primary-700)", 
                                            }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {preview.cuotas.map((c, i) => (
                                        <tr key={c.numeroCuota} style={{
                                            borderTop: "1px solid var(--border-subtle)",
                                            backgroundColor: i % 2 === 0 ? "transparent" : "var(--surface-2, rgba(0,0,0,0.02))",
                                        }}>
                                            <td style={{ padding: "7px 12px", color: "var(--primary-500)", fontWeight: "600" }}>
                                                {c.numeroCuota}
                                            </td>
                                            <td style={{ padding: "7px 12px" }}>{c.fechaVencimiento}</td>
                                            <td style={{ padding: "7px 12px", fontWeight: "600" }}>
                                                ${Number(c.monto).toLocaleString("es-AR")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
                    * Al confirmar se registra el crédito y se genera el plan de pagos definitivo.
                </p>
            </div>
        </Modal>
    );
}