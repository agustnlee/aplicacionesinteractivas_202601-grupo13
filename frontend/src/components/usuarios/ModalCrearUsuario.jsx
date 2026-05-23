import Modal from "../common/Modal";
import Button from "../ui/Button";
import InputPassword from "../common/InputPassword";

export default function ModalCrearUsuario({
    isOpen,
    onClose,
    formData,
    onChange,
    onSubmit,
    roles = [],
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Crear usuario"
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}
            >
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={onChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={onChange}
                />

                <InputPassword
                    value={formData.password}
                    onChange={onChange}
                />

                <select
                    name="rol"
                    value={formData.rol}
                    onChange={onChange}
                >
                    {roles?.map((rol) => (
                        <option key={rol} value={rol}>
                            {rol}
                        </option>
                    ))}
                </select>

                <Button onClick={onSubmit}>
                    Crear usuario
                </Button>
            </div>
        </Modal>
    );
}