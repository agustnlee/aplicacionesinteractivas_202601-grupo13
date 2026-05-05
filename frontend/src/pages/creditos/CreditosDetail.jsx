import { useParams } from "react-router-dom";

export default function CreditosDetail() {
    const { id } = useParams();

    return (<> 
        <p> funciona /CreditosDetail {id}</p>
        
        
        
    </>);
}