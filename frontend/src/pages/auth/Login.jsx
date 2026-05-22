import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import Button from "../../components/ui/Button";
import InputPassword from "../../components/common/InputPassword";

export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    const [form, setForm] = useState({
        email: "admin@tp13.com",
        password: "admin123"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(form.email, form.password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({
                id:     data.id,
                nombre: data.nombre,
                email:  data.email,
                rol:    data.rol,
            }));
            navigate("/");
        } catch (err) {
            setError(err?.mensajes?.[0] ?? "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="page">
            <section className="card" style={{ maxWidth: "420px", margin: "80px auto" }}>
                <h1>Iniciar sesión</h1>
                <p className="text-muted">Ingresá con tu usuario para acceder al sistema.</p>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
                    <label>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Ingrese Email"
                        />
                    </label>

                    <label>
                        Contraseña
                        <InputPassword
                            value={form.password}
                            onChange={handleChange}
                        />
                    </label>

                    {error && (
                        <p className="text-danger">
                            {error}
                        </p>
                    )}

                    <Button type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </Button>
                </form>
            </section>
        </div>
    );
}