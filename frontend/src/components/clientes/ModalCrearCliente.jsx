import { useState } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm"; 
import { ICONS } from "../../utils/icontypes";
import { useToast } from "../../hooks/useToast"; 

import styles from "./ModalCliente.module.css"; 

export default function ModalCrearCliente({ isOpen, onClose, onSubmit }) {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        nombre: "",
        dni: "",
        email: "",
        telefono: "",
        domicilio: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmar = async () => {
        if (!formData.nombre.trim() || !formData.dni.trim() || !formData.telefono.trim() || !formData.domicilio.trim() || !formData.email.trim()) {
            showToast("Todos los campos son obligatorios", "warning");
            return;
        }

        setIsLoading(true);

        try {
            await onSubmit(formData);
            
            setFormData({ nombre: "", dni: "", email: "", telefono: "", domicilio: "" });
            onClose();
        } catch (err) {
            console.error("El guardado fue rechazado por el contenedor principal.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nuevo Cliente"
            description="Completá todos los datos para registrar el cliente."
            icon={ICONS.user}
            iconVariant="primary"
            size="lg"
            actions={[
                {
                    label: isLoading ? "Guardando..." : "Crear Cliente",
                    onClick: handleConfirmar,
                    variant: "primary",
                    disabled: isLoading
                }
            ]}
        >
            <div className={styles.formContainer}>
                <ModalForm 
                    label="Nombre *" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder="Ej: Juan Perez" 
                />

                <div className={styles.row}>
                    <ModalForm 
                        label="DNI * (7-8 dígitos)" 
                        name="dni" 
                        value={formData.dni} 
                        onChange={handleChange} 
                        placeholder="Ej: 11223344" 
                    />
                    <ModalForm 
                        label="Email *" 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="ejemplo@mail.com" 
                    />
                </div>

                <div className={styles.row}>
                    <ModalForm 
                        label="Teléfono * (8-10 dígitos)" 
                        name="telefono" 
                        value={formData.telefono} 
                        onChange={handleChange} 
                        placeholder="Ej: 12345678" 
                    />
                    <ModalForm 
                        label="Domicilio *" 
                        name="domicilio" 
                        value={formData.domicilio} 
                        onChange={handleChange} 
                        placeholder="Ej: Av Independencia 1234" 
                    />
                </div>
            </div>
        </Modal>
    );
}