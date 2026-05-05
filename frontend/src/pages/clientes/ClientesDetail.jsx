import { useParams } from "react-router-dom";

export default function ClientesDetail() {
    const { id } = useParams();

    return (<> 
        <p> funciona /ClientesDetail {id}</p>
        
        
        
    </>);
}