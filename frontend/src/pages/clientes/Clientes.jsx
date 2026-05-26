import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { listarClientes, buscarClientePorId, crearCliente } from "../../api/clientesApi";
import { useToast } from "../../hooks/useToast";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import RowModels from "../../components/common/RowModels";
import ModalCrearCliente from "../../components/clientes/ModalCrearCliente";
import ColumnEtiquetas from "../../components/clientes/ColumnEtiquetas";
import styles from "../PagesDetail.module.css";

const FIELDS = [
    { key: "id",         label: "ID Exacto",  type: "number" },
    { key: "nombre",     label: "Nombre",      type: "text"   },
    { key: "estado",     label: "Estado",      type: "select", options: [
        { label: "Activo",   value: "true"  },
        { label: "Inactivo", value: "false" },
    ]},
    { key: "creadoPorId", label: "ID Creador", type: "number" },
];

const COLUMNS = [
    { key: "id", label: "ID", width: "8%" },
    {
        key: "nombre", label: "Nombre", width: "30%",
        render: (item) => (
            <Link to={`/clientes/${item.id}`} className={styles.link}>
                <strong>{item.nombre}</strong>
            </Link>
        ),
    },
    { key: "telefono", label: "Teléfono", width: "17%" },
    {
        key: "estado", label: "Estado", width: "13%",
        render: (item) => (
            <span className={`badge ${item.estado ? "badge-success" : "badge-danger"}`}>
                {item.estado ? "Activo" : "Inactivo"}
            </span>
        ),
    },
    {
        key: "etiquetas", label: "Etiquetas", width: "32%",
        render: (item) => <ColumnEtiquetas clienteId={item.id} />,
    },
];

export default function Clientes() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [clientes, setClientes]     = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentPage = parseInt(searchParams.get("pagina") || "0", 10);

    const cargarClientes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const paramsObjeto = Object.fromEntries([...searchParams]);

            // ID exacto → navegar directo
            if (paramsObjeto.id) {
                try {
                    const encontrado = await buscarClientePorId(paramsObjeto.id);
                    navigate(`/clientes/${encontrado.id}`, { replace: true });
                    return;
                } catch {
                    setError({ mensajes: ["No se encontró ningún cliente con ese ID."] });
                    setIsLoading(false);
                    return;
                }
            }

            const { id, ...filtrosPaginados } = paramsObjeto;
            filtrosPaginados.pagina  = currentPage;
            filtrosPaginados.tamanio = 5;

            const respuesta = await listarClientes(filtrosPaginados);
            setClientes(respuesta.contenido || []);
            setTotalPages(respuesta.totalPaginas || 0);
        } catch (err) {
            setError(err?.mensajes?.join(", ") ?? "Error al cargar los clientes.");
        } finally {
            setIsLoading(false);
        }
    }, [searchParams, currentPage, navigate]);

    const handleCrearCliente = async (formData) => {
        try {
            const clienteCreado = await crearCliente(formData);
            showToast("Cliente creado exitosamente", "success");
            setIsModalOpen(false);
            navigate(`/clientes/${clienteCreado.id}`);
        } catch (err) {
            showToast(err?.mensajes?.[0] ?? "Error al crear el cliente", "error");
            throw err;
        }
    };

    useEffect(() => { cargarClientes(); }, [cargarClientes]);

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.titulo}`}>Gestión de Clientes</h2>
            <PaginatedContainer
                fields={FIELDS}
                columns={COLUMNS}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                isEmpty={!clientes.length}
                error={error}
                onCreate={() => setIsModalOpen(true)}
            >
                {clientes.map((cliente) => (
                    <RowModels
                        key={cliente.id}
                        item={cliente}
                        columns={COLUMNS}
                        basePath="/clientes"
                    />
                ))}
            </PaginatedContainer>

            <ModalCrearCliente
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCrearCliente}
            />
        </div>
    );
}