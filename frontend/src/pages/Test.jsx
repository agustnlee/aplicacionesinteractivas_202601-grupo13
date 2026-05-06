import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import Spinner from "../components/common/Spinner";

export default function Test() {
  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>

      <h2>Buttons</h2>

      {/* Variants */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>

      {/* Sizes */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* With icons */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button icon="save">Save</Button>
        <Button icon="trash" variant="danger">Delete</Button>
        <Button icon="arrowright" iconPosition="right">Next</Button>
      </div>

      {/* Disabled */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Button disabled>Disabled</Button>
        <Button variant="danger" disabled>Disabled Danger</Button>
      </div>

      <h2>Icon Buttons</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        <IconButton icon="menu" />
        <IconButton icon="user" />
        <IconButton icon="trash" variant="danger" />
        <IconButton icon="save" variant="primary" />
        <IconButton icon="save" disabled />
      </div>

      <h2>Spinners</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>

      <h2>Real use case</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button icon="save">Guardar</Button>
        <Button variant="danger" icon="trash">Eliminar</Button>
        <Button variant="ghost">Cancelar</Button>
      </div>

    </div>
  );
}