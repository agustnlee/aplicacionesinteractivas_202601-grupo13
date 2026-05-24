import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "../creditos/ModalCambiarCobrador.module.css";
import ColorPalette from "../common/ColorPalette";



export default function ModalCrearEtiqueta({isOpen, onClose, onConfirm })
{ const[descripcion, setDescripcion] = useState("");
    const[nombre,setNombre]= useState("");
   const[color,setColor]= useState("");

  const [error, setError]= useState("");
  
  const INITIAL_FORM = {nombre: "a", descripcion:"b",color: "c"
   
};
const [formData, setFormData] = useState(INITIAL_FORM);
const handleCambiarcolor = async (color) => {
        try {
            showToast("Color actualizado correctamente", "success");
            
            setColor(color);
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar color", "error");
        }
    };
  

 const handleConfirm = () => {
    formData.nombre=nombre;
    formData.descripcion=descripcion;
    formData.color=color;

    onConfirm(formData);
  }

   const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

  
  const handleClose = () => { 
    setFormData(""); 
    setError(""); 
    onClose();
  }

   return (
          <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="CrearEtiqueta"
              description="Ingresá los datos de la nueva etiqueta"
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
                      placeholder={descripcion}
                      className={`${styles.input} ${error ? styles.inputError : ""}`}
                  />
                  {error && <span className={styles.error}>{error}</span>}
              </div>


               <div className={styles.body}>
                  <label className={styles.label}> NOMBRE ETIQUETA</label>
                  <input
                      type="text"
                      value={nombre}
                      onChange={e => { setNombre(e.target.value); setError(""); }}
                      placeholder={nombre}
                      className={`${styles.input} ${error ? styles.inputError : ""}`}
                  />
                  {error && <span className={styles.error}>{error}</span>}
              </div>


              <div>
                
                <ColorPalette onConfirm={handleCambiarcolor} /> 
                      
              </div>

          </Modal>
      );
  }
