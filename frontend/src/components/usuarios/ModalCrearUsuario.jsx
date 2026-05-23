import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Button from "../ui/Button";
import InputPassword from "../common/InputPassword";

const INITIAL_FORM = {
    nombre:   "",
    email:    "",
    password: "",
    rol:      "COBRADOR",
};


export default function ModalCrearUsuario({
    isOpen,
    onClose,
    onConfirm
}) {

    const [formData, setFormData] = useState("");

    useEffect(() => {
        if (!isOpen) setFormData(INITIAL_FORM);
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onConfirm(formData);        // datos al padre
    };


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
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <InputPassword
                    value={formData.password}
                    onChange={handleChange}
                />

                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                >
                        <option value="ADMIN">Admin</option>
                        <option value="ANALISTA">Analista</option>
                        <option value="COBRADOR">Cobrador</option>
                </select>

                <Button onClick={handleSubmit}>
                    Crear usuario
                </Button>
            </div>
        </Modal>
    );
}