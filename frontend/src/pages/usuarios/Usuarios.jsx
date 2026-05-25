import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  { key: "id",     label: "ID",     type: "number" },
  { key: "nombre", label: "Nombre", type: "text" },
  { key: "rol",    label: "Rol",    type: "select", options: [
    { value: "ADMIN",    label: "Admin"    },
    { value: "ANALISTA", label: "Analista" },
    { value: "COBRADOR", label: "Cobrador" },
  ]},
  { key: "estado", label: "Estado", type: "select", options: [
    { value: "true",  label: "Activo"   },
    { value: "false", label: "Inactivo" },
  ]},
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
    const navigate = useNavigate();
    const { showToast } = useToast();
    

    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const page = parseInt(searchParams.get("pagina") ?? "0", 10);

    const id     = searchParams.get("id")     ?? undefined;
    const nombre = searchParams.get("nombre") ?? undefined;
    const rol    = searchParams.get("rol")    ?? undefined;
    const estado = searchParams.get("estado") ?? undefined;

    const fetchUsuarios = async (showLoader = true) => {
        if (showLoader) setIsLoading(true);
        setError(null);

        try {

            const data = await getUsuarios({...(id     && { id     }), ...(nombre && { nombre }), ...(rol    && { rol    }), ...(estado && { estado }), pagina: page, tamanio: 10 });
            setUsuarios(data.contenido ?? []);
            setTotalPages(data.totalPaginas ?? 1);

        } catch (err) {

            setError(err?.mensajes?.[0] ?? "Error al cargar usuarios");

        } finally {

            if (showLoader) setIsLoading(false);

        }

    };

    useEffect(() => {

        fetchUsuarios();

    }, [page, id, nombre, rol, estado]); // si cambia pagina se hace refetch


    const handleCrearUsuario = async (formData) => {
        try {

            const usuario = await crearUsuario(formData);

            showToast("Usuario creado correctamente", "success");

            setIsModalOpen(false);

            navigate(`/usuarios/${usuario.id}`);  

        } catch (err) {

            console.error(err);

            showToast(
                err?.mensajes?.[0] ?? "Error al crear usuario",
                "error"
            );
        }
    };

    return (
        <div className={`${styles.page} ${!isLoading ? "" : "is-loading"}`}>

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