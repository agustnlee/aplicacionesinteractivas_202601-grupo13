import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BuscarClientesThunk, ObtenerClientePorIdThunk, CrearClienteThunk } from "../../store/clienteSlice";
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

    const dispatch = useDispatch();
    const { clientes, totalPaginas: totalPages, loading: isLoading, error } = useSelector(state => state.clientes);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentPage = parseInt(searchParams.get("pagina") || "0", 10);

    useEffect(() => {
        const paramsObjeto = Object.fromEntries([...searchParams]);

        if (paramsObjeto.id) {
            dispatch(ObtenerClientePorIdThunk(paramsObjeto.id))
                .unwrap()
                .then((encontrado) => navigate(`/clientes/${encontrado.id}`, { replace: true }))
                .catch(() => showToast("No se encontró ningún cliente con ese ID.", "error"));
            return;
        }

        const { id, ...filtrosPaginados } = paramsObjeto;
        filtrosPaginados.pagina  = currentPage;
        filtrosPaginados.tamanio = 5;

        dispatch(BuscarClientesThunk(filtrosPaginados));
    }, [searchParams, currentPage, dispatch, navigate]);



    const handleCrearCliente = async (formData) => {
        try {
            const clienteCreado = await dispatch(CrearClienteThunk(formData)).unwrap();
            showToast("Cliente creado exitosamente", "success");
            setIsModalOpen(false);
            navigate(`/clientes/${clienteCreado.id}`);
        } catch (err) {
            showToast(err?.mensajes?.[0] ?? "Error al crear el cliente", "error");
            throw err;
        }
    };

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