export default function ModalRow({ label, value }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)" }}>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text)", textAlign: "right" }}>{value}</span>
        </div>
    );
}