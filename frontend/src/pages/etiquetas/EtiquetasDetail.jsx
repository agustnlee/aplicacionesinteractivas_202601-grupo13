import { useParams } from "react-router-dom";
import { useState , useEffect, startTransition} from "react";
import styles from "../PagesDetail.module.css";
import { useToast } from "../../hooks/useToast";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import PaginatedContainer from "../../components/common/PaginatedContainer";
import DataField from "../../components/common/DataField";
import Button from "../../components/ui/Button";
import ColorPalette from "../../components/common/ColorPalette";

import { obtenerEtiquetaPorId, modificarEtiqueta, crearEtiqueta } from "../../api/apiEtiquetas";
import {obtenerResumenEtiquetas} from "../../api/apiClienteEtiquetas";
import ModalModifcarEtiquetaNombre from "../../components/etiquetas/ModalModificarEtiquetaNombre";
import ModalModifcarEtiquetaDescripcion from "../../components/etiquetas/ModalModificarEtiquetaDescripcion";
import ModalCrearEtiqueta from "../../components/etiquetas/ModalCrearEtiqueta";







export default function EtiquetasDetail() {
    const { id } = useParams();
    const mockEtiqueta ={id:1, nombre: "mora", color: "#16a34a", descripcion: "blabla"}
    const mockcantUs={cant: 12};

    const [modalNombre, setModalNombre]= useState(false);
     const [modalDescripcion, setModalDescripcion]= useState(false);
     const [colorPalette, setColorPalette ] = useState(false);
     const [modalCrear, setModalCrear]= useState(false);


  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { showToast } = useToast();
    
    const [etiqueta, setEtiqueta]   = useState(mockEtiqueta);
    const [cantUsuarios]= useState(mockcantUs);




    const handleCambiarNombre = async (nuevoNombre) => {
        try {
            showToast("Nombre actualizado correctamente", "success");
            setModalNombre(false);
            etiqueta.nombre = nuevoNombre;
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar nombre", "error");
        }
    };

    const handleCambiarcolor = async (color) => {
        try {
            showToast("Color actualizado correctamente", "success");
            
            setEtiqueta(prev => ({ ...prev, color: color }));
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar color", "error");
        }
    };

    const handleCrearEtiqueta=async(nuevaEtiqueta)=>{

        try {
            showToast ("etiqueta Creada correctamente", "success");
            setModalCrear(false);
        }
        catch(e){
            showToast(e?.mensajes?.[0]?? "Error al crear etiqueta", "error")
        }
    }

    

    const handleCambiarDescripcion = async (nuevaDesc) => {
        try {
            showToast("Descripcion actualizado correctamente", "success");
            setModalDescripcion(false);
            etiqueta.descripcion = nuevaDesc;
        } catch (e) {
            showToast(e?.mensajes?.[0] ?? "Error al cambiar descripcion", "error");
        }
    };


    
   

    return (<> 
   
    <div className={styles.page}>
            <h2 className={`title  ${styles.seccion}`}>Detalle de Etiqueta</h2>
    </div>    

    
    
    <div className={styles.card}>
      <div className={styles.filaData}>
        <DataField label="ID"       value={`#${etiqueta.id}`} />
        <DataField label="NOMBRE"  value={`#${etiqueta.nombre}`} />
        <DataField label="DESCRIPCION" value={`#${etiqueta.descripcion}`} />
         <DataField label="USUARIOS ASIGNADOS"  value={`#${cantUsuarios.cant}`} />
        <div style={{ color: "var(--text-muted)" , fontSize: "var(--text-xs)" , fontWeight: "var(--font-medium)"}}  > COLOR 
           <div style={{padding:"4px"}}/>
            <div style={{ padding:"7px", width:"7px", backgroundColor:etiqueta.color,  borderRadius: "50%"}}/>
           
        </div>
          <ColorPalette onConfirm={handleCambiarcolor} /> 
      </div>

    

<LoadingWrapper isLoading={isLoading} error={error} isEmpty={!etiqueta}> 
    
        <div> cambiar nombre<Button icon="edit"  variant="ghost"  size="md"  onClick={() => setModalNombre(true)}/></div>
        

       <div >Cambiar descripcion<Button icon="edit"  variant="ghost"  size="md"  onClick={() => setModalDescripcion(true)}/></div> 
           

        <Button icon="trash" variant="danger" size="md" >
            eliminar etiqueta <Button icon="edit"  variant="ghost"  size="md"  onClick={() => set(true)}/>
        </Button>

        <div>crearEtiqueta
            <Button onClick={setModalCrear(true)}>
                crear

            </Button>
        </div>


  
  </LoadingWrapper>    




        <ModalModifcarEtiquetaNombre   isOpen={modalNombre}
                onClose={() => setModalNombre(false)}
                onConfirm={handleCambiarNombre}>


        </ModalModifcarEtiquetaNombre>

        


        <ModalModifcarEtiquetaDescripcion isOpen={modalDescripcion}
                onClose={() => s(false)}
                onConfirm={handleCambiarDescripcion}>


        </ModalModifcarEtiquetaDescripcion>

        <ModalCrearEtiqueta isOpen={modalCrear} onClose={()=> setModalCrear(false)} onConfirm={handleCrearEtiqueta}>


        </ModalCrearEtiqueta>



        
  
  

    
        
     </div>   
        
        
    </>);
}