
import React, { useState , useEffect} from "react";
import { crearEtiqueta, obtenerEtiquetaPorId } from "../../api/apiEtiquetas";
import Button from "../../components/ui/Button";
import Spinner from "../../components/common/Spinner";




export default function CreadorEtiquetaMock() {
    const [isLoading, setIsLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [etiquetaData, setEtiquetaData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

const mockEtiqueta = { 
           id:1, nombre: "mora", color: "#16a34a", descripcion: "blabla"};
   
    const handleCrearEtiqueta = async () => {
        
       

        try {
            setIsLoading(true);
            
        
            const respuesta = await crearEtiqueta(mockEtiqueta);
            
            console.log("Etiqueta creada exitosamente:", respuesta);
            setMensaje("sss");
            
        } catch (error) {
            console.error("Falló la creación:", error);
            setMensaje("nnn")
            
        } finally {
            setIsLoading(false);
        }
    };


const handleObtenerEtiquetaPorId = async () => {
                try {
            setIsLoading(true);
            
        
            const res = await obtenerEtiquetaPorId("1");

            
            
            console.log("Etiqueta creada exitosamente:", res);
            setMensaje("sss");
            
        } catch (error) {
            console.error("Falló la creación:", error);
            setMensaje("nnn")
            
        } finally {
            setIsLoading(false);
        }
            }; 
  



    return (
        <div style={{ padding: "20px", border: "1px dashed var(--border)", borderRadius: "var(--radius)" }}>
            <h3>Probar Creación de Etiqueta</h3>
            
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "15px" }}>
                <Button 
                    variant="primary" 
                    onClick={handleCrearEtiqueta}
                    disabled={isLoading}
                >
                    {isLoading ? "Creando..." : "Enviar Mock Data"}
                </Button>

                {isLoading && <Spinner size="sm" />}
            


                <div>
            <Button variant="primary" onClick={handleObtenerEtiquetaPorId, () => setIsOpen(!isOpen)} ><div><p>this</p></div></Button>
                                     
                   {isOpen && (
                        <div style={{ marginTop: '15px' }}>

                            

                        </div>)}
                     
                    
                </div>  
            </div>
        </div>
    );
}