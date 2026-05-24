import { useState } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "../creditos/ModalCambiarCobrador.module.css";


export default function ModalAsignarEtiqueta({isOpen, onClose, onConfirm })
{ const[idCliente, setIdCliente] = useState("");
  const [error, setError]= useState("");

 const handleConfirm = () => {
    setError("");
    onConfirm(idCliente);
  }

  
  const handleClose = () => { 
    setIdCliente(""); 
    setError(""); 
    onClose();
  }

   return (
          <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="Asignar/Desasignar cliente"
              description="Ingrese el id del cliente que desea Asignar o Deasignar a una etiqueta"
              icon={ICONS.edit}
              iconVariant="default"
              size="sm"
              actions={[{ label: "Confirmar", onClick: handleConfirm, variant: "primary" }]}
          >
              <div className={styles.body}>
                  <label className={styles.label}> ID CLIENTE</label>
                  <input
                      type="text"
                      value={idCliente}
                      onChange={e => { setIdCliente(e.target.value); setError(""); }}
                      placeholder="Ej: aaa"
                      className={`${styles.input} ${error ? styles.inputError : ""}`}
                  />
                  {error && <span className={styles.error}>{error}</span>}
              </div>
          </Modal>
      );
  }