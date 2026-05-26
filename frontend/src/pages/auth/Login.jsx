import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { useToast } from "../../hooks/useToast";
import Button from "../../components/ui/Button";
import InlineMessage from "../../components/auth/InlineMessage";
import { ICONS } from "../../utils/icontypes";
import styles from "./Login.module.css";

export default function Login() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const token = localStorage.getItem("token");

    const [loading,      setLoading]      = useState(false);
    const [error,        setError]        = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email:    "admin@tp13.com",
        password: "admin123",
    });

    if (token) return <Navigate to="/" replace />;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = await login(form.email, form.password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({
                id:     data.id,
                nombre: data.nombre,
                email:  data.email,
                rol:    data.rol,
            }));
            showToast("Sesión iniciada correctamente", "success");
            navigate("/");
        } catch (err) {
            const msg = err?.mensajes?.[0] ?? "Credenciales incorrectas";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const EyeIcon = showPassword ? ICONS.eye : ICONS.eyeOff;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                <div className={styles.header}>
                    <h1>Iniciar sesión</h1>
                    <ICONS.user size={28} color="var(--primary-900)" />
                </div>

                <p className={styles.subtitle}>
                    Ingresá con tu usuario para acceder al sistema.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>

                    {/* Email */}
                    <div className={styles.inputRow}>
                        <span className={styles.inputIcon}>
                            <ICONS.mail size={18} />
                        </span>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                        />
                    </div>

                    {/* Password */}
                    <div className={styles.inputRow}>
                        <span className={styles.inputIcon}>
                            <ICONS.lockClosed size={18} />
                        </span>
                        <div className={styles.passwordWrapper}>
                            <input
                                className={styles.passwordInner}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                placeholder="Contraseña"
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

                    <hr className={styles.divider} />

                    {error && (
                        <InlineMessage type="error" onClose={() => setError(null)}>
                            {error}
                        </InlineMessage>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className={styles.submitBtn}
                    >
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </Button>
                </form>
            </div>
        </div>
    );
}