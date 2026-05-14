import { useEffect, useState } from "react";
import { getUsuarios, crearUsuario } from "../../api/usuariosApi";
import Modal from "../../components/common/Modal";
import Button from "../../components/ui/Button";
import LoadingWrapper from "../../components/common/LoadingWrapper";

const ROLES = [
  "ADMIN",
  "ANALISTA",
  "COBRADOR"
];

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "COBRADOR"
    });

    const fetchUsuarios = async () => {

        try {

            setIsLoading(true);

            const data = await getUsuarios();

            console.log(data);

            setUsuarios(data.contenido ?? []);

        } catch (err) {

            console.error(err);
            setError(err);

        } finally {

            setIsLoading(false);

        }

    };

    useEffect(() => {

        fetchUsuarios();

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCrearUsuario = async () => {
        try {

            await crearUsuario(formData);

            setIsModalOpen(false);

            setFormData({
                nombre: "",
                email: "",
                password: "",
                rol: "COBRADOR"
            });

            fetchUsuarios();

        } catch (err) {

            console.error(err);

            alert(
                err?.mensajes?.[0] ||
                "Error al crear usuario"
            );
        }
    };

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Usuarios</h1>
                    <p className="text-muted">Listado de usuarios del sistema.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    + Crear usuario
                </Button>
            </div>

            <LoadingWrapper
                isLoading={isLoading}
                error={error}
                isEmpty={usuarios.length === 0}
                emptyMessage="No hay usuarios cargados."
            >
                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.rol}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </LoadingWrapper>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
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

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                    >
                        {ROLES.map((rol) => (
                            <option key={rol} value={rol}>
                                {rol}
                            </option>
                        ))}
                    </select>

                    <Button onClick={handleCrearUsuario}>
                        Crear usuario
                    </Button>

                </div>

            </Modal>

        </div>
    );

}