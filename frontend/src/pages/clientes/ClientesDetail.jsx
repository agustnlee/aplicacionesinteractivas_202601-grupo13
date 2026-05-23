import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerFichaCliente, editarCliente, alterarEstadoCliente } from "../../api/clientesApi"; 
import { useToast } from "../../hooks/useToast";

import PaginatedContainer from "../../components/common/PaginatedContainer";
import RowModels from "../../components/common/RowModels";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";

import ModalEditarCliente from "../../components/clientes/ModalEditarCliente";
import ModalAlterarEstado from "../../components/clientes/ModalAlterarEstado";

import styles from "../PagesDetail.module.css";

const columnsCreditos = [
    { key: "id", label: "ID", width: "10%" },
    { key: "monto", label: "Monto", width: "20%", render: (c) => `$${c.monto.toLocaleString()}` },
    { 
        key: "fechaCreacion", 
        label: "Fecha de Inicio", 
        width: "20%",
        render: (c) => new Date(c.fechaCreacion).toLocaleDateString("es-AR") 
    },
    { 
        key: "cobradorNombre", 
        label: "Cobrador", 
        width: "25%",
        render: (c) => (
            c.cobradorId ? (
                <Link to={`/usuarios/${c.cobradorId}`} className={styles.link}>
                    {c.cobradorNombre}
                </Link>
            ) : (
                <span style={{ color: "var(--text-muted)" }}>Sin asignar</span>
            )
        )
    },
    { 
        key: "estado", 
        label: "Estado", 
        width: "25%",
        render: (c) => (
            <span className={`badge ${c.estado === 'ACTIVO' ? 'badge-success' : 'badge-neutral'}`}>
                {c.estado.replace(/_/g, " ")}
            </span>
        )
    }
];

const columnsEtiquetas = [
    { key: "idClienteEtiqueta", label: "idClienteEtiqueta", width: "20%" },
    { key: "idEtiqueta", label: "ID Etiqueta", width: "20%" },
    { key: "nombre", label: "Nombre", width: "40%" },
    { 
        key: "color", 
        label: "Color", 
        width: "20%",
        render: (et) => (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: et.color, border: "1px solid var(--border-subtle)" }}></div>
                <span>{et.color}</span>
            </div>
        )
    }
];

export default function ClientesDetail() {
    const { id } = useParams();
    const { showToast } = useToast();

    const [cliente, setCliente] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalEstado, setModalEstado] = useState(false);

    const cargarFicha = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await obtenerFichaCliente(id);
            setCliente(data);
        } catch (err) {
            setError(err.mensajes ? err.mensajes.join(", ") : "Error al cargar la ficha del cliente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditarCliente = async (clienteId, requestData) => {
        try {
            await editarCliente(clienteId, requestData);
            showToast("Datos actualizados exitosamente", "success");
            await cargarFicha();
        } catch (err) {
            const mensajeError = err?.mensajes?.[0] ?? "Ocurrió un error al actualizar el cliente";
            showToast(mensajeError, "error");
            throw err;
        }
    };

    const handleAlterarEstado = async (clienteId, nuevoEstado) => {
        try {
            
            await alterarEstadoCliente(clienteId, nuevoEstado);
            showToast(`Cliente ${nuevoEstado ? "dado de alta" : "dado de baja"} exitosamente`, "success");
            await cargarFicha(); 
        } catch (err) {
            const mensajeError = err?.mensajes?.[0] ?? "Ocurrió un error al alterar el estado del cliente";
            showToast(mensajeError, "error");
            throw err; 
        }
    };

    useEffect(() => {
        cargarFicha();
    }, [id]);

    if (isLoading && !cliente) return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando ficha...</div>;
    if (error && !cliente) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
    if (!cliente) return null;

    return (
        <div className={styles.page}>
            <h2 className={`title ${styles.titulo}`}>Detalle de Cliente</h2>

            <div className={styles.card}>
                <div className={styles.filaData}>
                    <DataField label="ID" value={`#${cliente.id}`} />
                    <DataField label="Nombre" value={cliente.nombre} />
                    <DataField label="DNI" value={cliente.dni} />
                    <DataField label="Email" value={cliente.email} />
                    <DataField label="Teléfono" value={cliente.telefono} />
                    <DataField label="Domicilio" value={cliente.domicilio} />
                    
                    <DataField label="Fecha de Alta" value={
                        new Date(cliente.fechaCreacion).toLocaleString("es-AR", { 
                            dateStyle: "short", timeStyle: "short" 
                        })
                    } />
                    
                    <DataField label="Creado por" value={
                        cliente.idCreador ? (
                            <Link to={`/usuarios/${cliente.idCreador}`} className={styles.link}>
                                {cliente.creadorNombre}
                            </Link>
                        ) : (
                            cliente.creadorNombre
                        )
                    } />

                    <DataField label="Estado" value={
                        <span className={`badge ${cliente.estado ? 'badge-success' : 'badge-danger'}`}>
                            {cliente.estado ? 'Activo' : 'Inactivo'}
                        </span>
                    } />
                </div>

                <div className={styles.acciones}>
                    <Button icon="edit" variant="ghost" size="md" onClick={() => setModalEditar(true)}>
                        Modificar datos
                    </Button>
                    <Button 
                        icon={cliente.estado ? "lockClosed" : "lockOpen"} 
                        variant={cliente.estado ? "danger" : "success"} 
                        size="md" 
                        onClick={() => setModalEstado(true)}
                    >
                        {cliente.estado ? "Dar de baja" : "Dar de alta"}
                    </Button>
                </div>
            </div>

            <h3 className={`title ${styles.titulo}`} style={{ marginTop: "var(--space-4)" }}>
                Etiquetas Asignadas (A DEFINIR)
            </h3>
            <PaginatedContainer
                columns={columnsEtiquetas}
                isLoading={false}
                isEmpty={!cliente.detalleEtiquetas?.length}
                error={null}
                currentPage={0}
                totalPages={1}
            >
                {cliente.detalleEtiquetas?.map(etiqueta => (
                    <RowModels
                        key={etiqueta.idClienteEtiqueta}
                        item={etiqueta}
                        columns={columnsEtiquetas}
                    />
                ))}
            </PaginatedContainer>

            <h3 className={`title ${styles.titulo}`} style={{ marginTop: "var(--space-4)" }}>
                Creditos Activos de {cliente.nombre}
            </h3>
            <PaginatedContainer
                columns={columnsCreditos}
                isLoading={false}
                isEmpty={!cliente.historialCreditos?.length}
                error={null}
                currentPage={0}
                totalPages={1}
            >
                {cliente.historialCreditos?.map(credito => (
                    <RowModels
                        key={credito.id}
                        item={credito}
                        columns={columnsCreditos}
                        basePath="/creditos" 
                    />
                ))}
            </PaginatedContainer>

            <ModalEditarCliente 
                isOpen={modalEditar} 
                onClose={() => setModalEditar(false)} 
                clienteActual={cliente}
                onSubmit={handleEditarCliente} 
            />
            <ModalAlterarEstado 
                isOpen={modalEstado} 
                onClose={() => setModalEstado(false)} 
                clienteId={cliente.id}
                estadoActual={cliente.estado}
                onSubmit={handleAlterarEstado} 
            />
        </div>
    );
}