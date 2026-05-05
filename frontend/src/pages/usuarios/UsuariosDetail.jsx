import { useParams } from "react-router-dom";

export default function UsuariosDetail() {
    const { id } = useParams();

    return (<> 
        <p> funciona /UsuariosDetail {id}</p>
        
        
        
    </>);
}