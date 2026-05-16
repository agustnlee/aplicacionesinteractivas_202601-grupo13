import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk, clearError } from "../../store/authSlice";
import Button from "../../components/ui/Button";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "admin@tp13.com",
        password: "admin123"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch(clearError());

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(loginThunk(form));

        if (loginThunk.fulfilled.match(result)) {
            navigate("/usuarios");
        }
    };

    return (
        <div className="page">
            <section className="card" style={{ maxWidth: "420px", margin: "80px auto" }}>
                <h1>Iniciar sesión</h1>
                <p className="text-muted">Ingresá con tu usuario para acceder al sistema.</p>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
                    <label>
                        Email
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Contraseña
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
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