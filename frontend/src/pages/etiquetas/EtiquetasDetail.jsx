import { useParams } from "react-router-dom";



export default function EtiquetasDetail() {
    const { id } = useParams();
    const mockEtiqueta ={id:1, nombre: "mora", color: "green", descripcion: "blabla"}

    return (<> 

    <div>

        <h1>Etiqueta: </h1>
        
        


    </div>
        <p> funciona /EtiquetasDetail {id}</p>
        
        
        
    </>);
}