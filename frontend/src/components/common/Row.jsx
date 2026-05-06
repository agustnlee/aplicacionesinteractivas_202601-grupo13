// reusable component for maybe etiquetas listado general

export default function Row({ children }) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {children}
    </div>
  );
}