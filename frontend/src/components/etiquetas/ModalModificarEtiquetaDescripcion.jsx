import { useState } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "../creditos/ModalCambiarCobrador.module.css";


export default function ModalModifcarEtiquetaDescripcion({isOpen, onClose, onConfirm })
{ const[descripcion, setDescripcion] = useState("");
  const [error, setError]= useState("");

 const handleConfirm = () => {
    setError("");
    onConfirm(descripcion);
  }

  
  const handleClose = () => { 
    setDescripcion(""); 
    setError(""); 
    onClose();
  }

   return (
          <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="Modificar descripcion"
              description="Ingresá la descripcion nueva de esta etiqueta."
              icon={ICONS.edit}
              iconVariant="default"
              size="sm"
              actions={[{ label: "Confirmar", onClick: handleConfirm, variant: "primary" }]}
          >
              <div className={styles.body}>
                  <label className={styles.label}> DESCRIPCION ETIQUETA</label>
                  <input
                      type="text"
                      value={descripcion}
                      onChange={e => { setDescripcion(e.target.value); setError(""); }}
                      placeholder="Ej: aaa"
                      className={`${styles.input} ${error ? styles.inputError : ""}`}
                  />
                  {error && <span className={styles.error}>{error}</span>}
              </div>
          </Modal>
      );
  }