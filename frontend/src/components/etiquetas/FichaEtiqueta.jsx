
import RowModels from '../common/RowModels'; // Ajustá la ruta si RowModels está en otra carpeta
import styles from '../../pages/PagesDetail.module.css';


const columnasConfig = [
    { key: "id",             label: "ID",       width: "60px",
        render: (c) => <strong>#{c.id}</strong> },
   
    { key: "nombre",          label: "Nombre",    width: "110px",
        render: (c) => `${c.nombre} cuotas` },

    { key: "cantidadCuotas", label: "descripcion",   width: "80px",
        render: (c) => `${c.cantidadCuotas} cuotas` },

    { key: "interes",        label: "Color",  width: "80px",
        render: (c) =>   <div style={{ padding:"7px", width:"7px", backgroundColor:c.color,  borderRadius: "50%"}}/> },
  
];



const FichaEtiqueta = ({ etiqueta }) => {
  // Definimos cómo se procesa y visualiza cada celda de la fila
  

  return (
    <RowModels 
      item={etiqueta} 
      columns={columnasConfig} 
      basePath="/etiqueta" 
    />
  );
};

export default F;