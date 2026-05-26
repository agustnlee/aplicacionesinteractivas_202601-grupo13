import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ModalForm from "../common/ModalForm";
import { ICONS } from "../../utils/icontypes";
import styles from "./ModalCrearUsuario.module.css";

const INITIAL = { nombre: "", email: "", password: "", rol: "COBRADOR" };

const ROLES = [
    { value: "ADMIN",    label: "Admin"    },
    { value: "ANALISTA", label: "Analista" },
    { value: "COBRADOR", label: "Cobrador" },
];

export default function ModalCrearUsuario({ isOpen, onClose, onConfirm }) {
    const [form,         setForm]         = useState(INITIAL);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isOpen) { setForm(INITIAL); setShowPassword(false); }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const formValido = form.nombre.trim() && form.email.trim() && form.password.trim();
    const EyeIcon    = showPassword ? ICONS.eye : ICONS.eyeOff;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Crear usuario"
            icon={ICONS.user}
            iconVariant="default"
            size="md"
            actions={[{
                label:    "Crear usuario",
                onClick:  () => onConfirm(form),
                variant:  "primary",
                disabled: !formValido,
            }]}
        >
            <div className={styles.body}>
                <ModalForm
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                />
                <ModalForm
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Ej: juan@mail.com"
                />

                {/* Password local */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Contraseña</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Ingresá una contraseña"
                            className={styles.passwordInner}
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword(p => !p)}
                        >
                            <EyeIcon size={16} />
                        </button>
                    </div>
                </div>

                {/* Rol */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Rol</label>
                    <select
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        {ROLES.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Modal>
    );
}