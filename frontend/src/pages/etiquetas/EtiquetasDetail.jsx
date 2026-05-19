import { useParams } from "react-router-dom";
import { obtenerEtiquetaPorId} from "../../api/apiEtiqueta";
import{obtenerResumenEtiquetas} from "../../api/apiClienteEtiquetas";
import { useState } from "react";




export default function EtiquetasDetail() {
    const { id } = useParams();
    const mockEtiqueta ={Id:1, nombre: "mora", color: "#16a34a", descripcion: "blabla"}
    const mockcantUs=["12"];

    const [etiquetaData, setEtiquetaData] = useState(null);
    const [resumenData, setResumenData] = useState(null);
    const{cantUsuarios}= useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    
useEffect(() => {
        const pedirEtiqueta = async () => {
            try {
                setIsLoading(true);
                setError(null);
              
                const data = await obtenerEtiquetaPorId(id);
                
                
                setEtiquetaData(data);
            } catch (err) {
                console.error( err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            pedirEtiqueta();
        }
    }, [id]);
  
useEffect(() => {    
        const fetchResumen = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await obtenerResumenEtiquetas();
            
                setResumenData(data);
            } catch (err) {
                console.error(err);
                setError(err );
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchResumen();
        }
    }, [id]);

    const etiquetaEncontrada = resumenData?.content?.find(
        (item) => String(item.idEtiqueta) === String(id)
    );

    cantUsuarios =  etiquetaEncontrada.cantidadClientes;



   

    return (<> 

    <div>
         <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{padding:"15px"}}>ID</th>
                                <th style={{padding:"15px"}}>Nombre</th>
                                <th style={{padding:"15px"}}>descripcion</th>
                                <th style={{padding:"15px"}}>color</th>
                                <th style={{padding:"15px"}}>cantidad de usuarios asignados  </th>
                            </tr>
                        </thead>

                        <tbody>
                            <td style={{padding:"15px"}}>{mockEtiqueta.Id}.</td>
                            <td  style={{padding:"15px"}}>{mockEtiqueta.nombre}</td>
                            <td  style={{padding:"15px"}}>{mockEtiqueta.descripcion}</td>
                            <td  style={{padding:"15px", backgroundColor:"#16a34a "}}>{mockEtiqueta.color}</td>
                        </tbody>



                    </table>
                </div>

        
        


    </div>
        <p> funciona /EtiquetasDetail {id}</p>
        
        
        
    </>);
}