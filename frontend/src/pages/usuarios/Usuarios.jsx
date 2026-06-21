import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsuariosThunk, crearUsuarioThunk } from "../../store/usuarioSlice";
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

    const dispatch = useDispatch();
    const { usuarios, loading: isLoading, error, totalPages } = useSelector(state => state.usuario);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const page = parseInt(searchParams.get("pagina") ?? "0", 10);

    const id     = searchParams.get("id")     ?? undefined;
    const nombre = searchParams.get("nombre") ?? undefined;
    const rol    = searchParams.get("rol")    ?? undefined;
    const estado = searchParams.get("estado") ?? undefined;


    const handleCrearUsuario = async (formData) => {
    try {
        const usuario = await dispatch(crearUsuarioThunk(formData)).unwrap();
        showToast("Usuario creado correctamente", "success");
        setIsModalOpen(false);
        navigate(`/usuarios/${usuario.id}`);
    } catch (err) {
        showToast(err?.mensajes?.[0] ?? "Error al crear usuario", "error");
    }
    };

    useEffect(() => {
        dispatch(fetchUsuariosThunk({
            ...(id && { id }),
            ...(nombre && { nombre }),
            ...(rol && { rol }),
            ...(estado && { estado }),
            pagina: page,
            tamanio: 10,
        }));
    }, [page, id, nombre, rol, estado, dispatch]);

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