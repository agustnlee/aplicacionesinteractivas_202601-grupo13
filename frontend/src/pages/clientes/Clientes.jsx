

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { listarClientes, buscarClientePorDni, buscarClientePorId, crearCliente } from "../../api/clientesApi"; 
import { useToast } from "../../hooks/useToast"; 
import PaginatedContainer from "../../components/common/PaginatedContainer";
import RowModels from "../../components/common/RowModels";
import ModalCrearCliente from "../../components/clientes/ModalCrearCliente"; 
import ColumnEtiquetas from "../../components/clientes/ColumnEtiquetas";

import styles from "../PagesDetail.module.css"; 

const fields = [
    { key: "id", label: "ID Exacto", type: "number" },
    { key: "dni", label: "DNI Exacto", type: "number" },
    { key: "nombre", label: "Nombre", type: "text" },
    { 
        key: "estado", 
        label: "Estado", 
        type: "select", 
        options: [
            { label: "Activo", value: "true" }, 
            { label: "Inactivo", value: "false" }
        ] 
    },
    { key: "creadoPorId", label: "ID Creador", type: "number" }
];

const columns = [
    { key: "id", label: "ID", width: "10%" },
    { key: "nombre", label: "Nombre", width: "30%" },
    { key: "dni", label: "DNI", width: "20%" },
    { key: "telefono", label: "Teléfono", width: "20%" },
    { 
        key: "estado", 
        label: "Estado", 
        width: "20%",
        render: (item) => (
            <span className={`badge ${item.estado ? 'badge-success' : 'badge-danger'}`}>
                {item.estado ? "Activo" : "Inactivo"}
            </span>
        )
    },
    { 
        key: "etiquetas", 
        label: "Etiquetas", 
        width: "35%",
        render: (item) => <ColumnEtiquetas clienteId={item.id} /> 
    }
];

export default function Clientes() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); 
    const { showToast } = useToast();
    
    const [clientes, setClientes] = useState([]);
    const [totalPages, setTotalPages] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentPage = parseInt(searchParams.get("pagina") || "0", 10);

    const cargarClientes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const paramsObjeto = Object.fromEntries([...searchParams]);
            if (paramsObjeto.dni) {
                try {
                    const clienteEncontrado = await buscarClientePorDni(paramsObjeto.dni);
                    if (clienteEncontrado) {
                        window.history.replaceState(null, '', '/clientes');
                        navigate(`/clientes/${clienteEncontrado.id}`);
                        return; 
                    }
                } catch (err) {
                    setClientes([]);
                    setTotalPages(0);
                    setError({ mensajes: ["No se encontró ningún cliente con ese DNI."] });
                    setIsLoading(false);
                    return;
                }
            }

            if (paramsObjeto.id) {
                try {
                    const clienteEncontrado = await buscarClientePorId(paramsObjeto.id);
                    if (clienteEncontrado) {
                        window.history.replaceState(null, '', '/clientes');
                        navigate(`/clientes/${clienteEncontrado.id}`);
                        return; 
                    }
                } catch (err) {
                    setClientes([]);
                    setTotalPages(0);
                    setError({ mensajes: ["No se encontró ningún cliente con ese ID."] });
                    setIsLoading(false);
                    return;
                }
            }
            const { dni, id, ...filtrosPaginados } = paramsObjeto;
            
            filtrosPaginados.pagina = currentPage;
            filtrosPaginados.tamanio = 5; 

            const respuesta = await listarClientes(filtrosPaginados);
            
            setClientes(respuesta.contenido || []); 
            setTotalPages(respuesta.totalPaginas || 0); 
        } catch (err) {
            setError(err.mensajes ? err.mensajes.join(", ") : "Error al cargar los clientes.");
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
            const mensajeError = err?.mensajes?.[0] ?? "Ocurrió un error al crear el cliente";
            showToast(mensajeError, "error");
            throw err; 
        }
    };

    useEffect(() => {
        cargarClientes();
    }, [cargarClientes]);

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.titulo}`}>Gestión de Clientes</h2>
            
            <PaginatedContainer
                fields={fields}
                columns={columns}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                isEmpty={!clientes.length }
                error={error} 
                onCreate={() => setIsModalOpen(true)}
            >
                {clientes.map((cliente) => (
                    <RowModels
                        key={cliente.id}
                        item={cliente}
                        columns={columns}
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