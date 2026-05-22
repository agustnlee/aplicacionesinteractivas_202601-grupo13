import { useEffect, useState } from "react";
import { getUsuarios, crearUsuario } from "../../api/usuarioApi";
import Button from "../../components/ui/Button";
import ModalCrearUsuario from "../../components/usuarios/ModalCrearUsuario";
import { useToast } from "../../hooks/useToast";
import PaginatedContainer from "../../components/common/PaginatedContainer";

const ROLES = [
  "ADMIN",
  "ANALISTA",
  "COBRADOR"
];

const USUARIO_FIELDS = [
  { label: "ID", key: "id" },
  { label: "Nombre", key: "nombre" },
  { label: "Email", key: "email" },
  { label: "Rol", key: "rol" },
];

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { showToast } = useToast();

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

            showToast("Usuario creado correctamente", "success");

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

            showToast(
                err?.mensajes?.[0] || "Error al crear usuario",
                "error"
            );
        }
    };

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Usuarios</h1>
                </div>
            </div>

            <h2>Listado de usuarios</h2>

            <PaginatedContainer
                fields={USUARIO_FIELDS}
                currentPage={0}
                totalPages={1}
                isLoading={isLoading}
                isEmpty={usuarios.length === 0}
                onCreate={() => setIsModalOpen(true)}
            >
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
            </PaginatedContainer>

            <ModalCrearUsuario
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleCrearUsuario}
                roles={ROLES}
            />

        </div>
    );

}