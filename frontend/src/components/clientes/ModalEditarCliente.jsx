import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm"; 
import { ICONS } from "../../utils/icontypes";
import { useToast } from "../../hooks/useToast";

import styles from "./ModalCliente.module.css"; 

export default function ModalEditarCliente({ isOpen, onClose, clienteActual, onSubmit }) {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        nombre: "",
        dni: "",
        email: "",
        telefono: "",
        domicilio: ""
    });

    useEffect(() => {
        if (clienteActual && isOpen) {
            setFormData({
                nombre: clienteActual.nombre || "",
                dni: clienteActual.dni || "",
                email: clienteActual.email || "",
                telefono: clienteActual.telefono || "",
                domicilio: clienteActual.domicilio || ""
            });
        }
    }, [clienteActual, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmar = async () => {
        if (!formData.nombre.trim() || !formData.telefono.trim() || !formData.domicilio.trim()) {
            showToast("Todos los campos habilitados son obligatorios", "warning");
            return;
        }

        setIsLoading(true);

        try {
            const requestData = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                domicilio: formData.domicilio
            };

            await onSubmit(clienteActual.id, requestData);
            
            onClose(); 
        } catch (err) {
            console.error("La edición fue rechazada por el contenedor principal.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Modificar datos del cliente"
            description="Actualizá la información del cliente."
            icon={ICONS.edit} 
            iconVariant="default" 
            size="lg"
            actions={[
                {
                    label: isLoading ? "Guardando..." : "Guardar cambios",
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
                />

                <div className={styles.row}>
                    <ModalForm 
                        label="DNI" 
                        name="dni" 
                        value={formData.dni} 
                        disabled={true} 
                    />
                    <ModalForm 
                        label="Email" 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        disabled={true} 
                    />
                </div>

                <div className={styles.row}>
                    <ModalForm 
                        label="Teléfono *" 
                        name="telefono" 
                        value={formData.telefono} 
                        onChange={handleChange} 
                    />
                    <ModalForm 
                        label="Domicilio *" 
                        name="domicilio" 
                        value={formData.domicilio} 
                        onChange={handleChange} 
                    />
                </div>
            </div>
        </Modal>
    );
}