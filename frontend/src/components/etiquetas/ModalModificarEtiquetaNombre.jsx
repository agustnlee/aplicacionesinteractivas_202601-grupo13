import { useState } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "../creditos/ModalCambiarCobrador.module.css";


export default function ModalModifcarEtiquetaNombre({isOpen, onClose, onConfirm })
{ const[nombre, setNombre] = useState("");
  const [error, setError]= useState("");

 const handleConfirm = () => {
    setError("");
    onConfirm(nombre);
  }

  
  const handleClose = () => { 
    setNombre(""); 
    setError(""); 
    onClose();
  }

   return (
          <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="Modificar nombre"
              description="Ingresá el nombre nuevo de esta etiqueta."
              icon={ICONS.edit}
              iconVariant="default"
              size="sm"
              actions={[{ label: "Confirmar", onClick: handleConfirm, variant: "primary" }]}
          >
              <div className={styles.body}>
                  <label className={styles.label}> NOMBRE ETIQUETA</label>
                  <input
                      type="text"
                      value={nombre}
                      onChange={e => { setNombre(e.target.value); setError(""); }}
                      placeholder="Ej: aaa"
                      className={`${styles.input} ${error ? styles.inputError : ""}`}
                  />
                  {error && <span className={styles.error}>{error}</span>}
              </div>
          </Modal>
      );
  }






