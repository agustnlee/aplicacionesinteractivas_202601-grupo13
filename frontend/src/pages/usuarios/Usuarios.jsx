import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUsuarios, crearUsuario } from "../../api/usuarioApi";
import ModalCrearUsuario from "../../components/usuarios/ModalCrearUsuario";
import FichaUsuario from "../../components/usuarios/FichaUsuario";
import { useToast } from "../../hooks/useToast";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import styles from "../PagesDetail.module.css";

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

const COLUMNS = [
    { label: "ID",     width: "60px"  },
    { label: "Nombre", width: "160px" },
    { label: "Email",  width: "200px" },
    { label: "Rol",    width: "120px" },
    { label: "Estado", width: "100px" },
];

export default function Usuarios() {
    const [searchParams] = useSearchParams();
    const { showToast } = useToast();

    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const page = parseInt(searchParams.get("pagina") ?? "0", 10);

    const fetchUsuarios = async () => {
        setIsLoading(true);
        setError(null);

        try {

            const data = await getUsuarios({ pagina: page, tamanio: 10 });

            console.log(data);

            setUsuarios(data.contenido ?? []);
            setTotalPages(data.totalPaginas ?? 1);

        } catch (err) {

            setError(err?.mensajes?.[0] ?? "Error al cargar usuarios");

        } finally {

            setIsLoading(false);

        }

    };

    useEffect(() => {

        fetchUsuarios();

    }, [page]); // si cambia pagina se hace refetch


    const handleCrearUsuario = async (formData) => {
        try {

            await crearUsuario(formData);

            showToast("Usuario creado correctamente", "success");

            setIsModalOpen(false);

            fetchUsuarios();

        } catch (err) {

            console.error(err);

            showToast(
                err?.mensajes?.[0] ?? "Error al crear usuario",
                "error"
            );
        }
    };

    return (
        <div className={styles.page}>

            <h2 className={`title`}>Listado de Usuarios</h2>

            <PaginatedContainer
                fields={USUARIO_FIELDS}
                columns={COLUMNS}
                currentPage={page}
                totalPages={totalPages}
                isLoading={isLoading}
                isEmpty={!usuarios.length}
                error={error}
                onCreate={() => setIsModalOpen(true)}
            >
                {usuarios.map(u => (
                    <FichaUsuario key={u.id} usuario={u} />
                ))}

            </PaginatedContainer>

            <ModalCrearUsuario
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleCrearUsuario}
            />

        </div>
    );

}