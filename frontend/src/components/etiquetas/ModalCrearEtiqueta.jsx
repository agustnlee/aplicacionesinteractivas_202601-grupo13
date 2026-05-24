import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { ICONS } from "../../utils/icontypes";
import styles from "../creditos/ModalCambiarCobrador.module.css";
import ColorPalette from "../common/ColorPalette";



export default function ModalCrearEtiqueta({isOpen, onClose, onConfirm })
{ const[descripcion, setDescripcion] = useState("");
    const[nombre, setNombre]= useState("");
    const[color, setColor]= useState("");
  const [error, setError]= useState("");

  const [formData, setFormData] = useState("");

  const INITIAL_FORM = {
    nombre:"",
    descripcion:"",
    color: "",
};

 const handleConfirm = () => {
    setError("");
    onConfirm(formData);
  }

  
      useEffect(() => {
          if (!isOpen) setFormData(INITIAL_FORM);
      }, [isOpen]);

  const handleCambiarcolor = async (colorN) => {

        setFormData(prev=> ({...prev,[color]: colorN}))
    
        
    };

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    

  
  const handleClose = () => { 
    setDescripcion(""); 
    setNombre(""),
    setColor(""),
    setError(""); 
    onClose();
  }

   return (
          <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="Crear Etiqueta"
              description="Ingresá los datos de la nueva etiqueta"
              icon={ICONS.edit}
              iconVariant="default"
              size="sm"
              actions={[{ label: "Confirmar", onClick: handleConfirm, variant: "primary" }]}
          >
              <div className={styles.body}>
                  <label className={styles.label}> nueva etiqueta</label>
                  <input
                     type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />

                   <ColorPalette onConfirm={handleCambiarcolor}/>
                  
                  
                  <input
                      type="text"
                    name="descripcion"
                    placeholder="Descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />


                  {error && <span className={styles.error}>{error}</span>}
              </div>
          </Modal>
      );
  }