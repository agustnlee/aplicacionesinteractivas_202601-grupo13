import { useParams } from "react-router-dom";

export default function EtiquetasDetail() {
    const { id } = useParams();

    return (<> 
        <p> funciona /EtiquetasDetail {id}</p>
        
        
        
    </>);
}