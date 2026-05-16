import React from "react";
import styles from "./ColorPicker.module.css";
import { useState } from "react";
import Button from "../ui/Button";
import Modal from "./Modal";



const ColorPicker = ()=> {

    const [color, setColor]= useState("#FFFFFF");
    const [modalOpen, setModalOpen]= useState(false);

    function handleOpenModal(event){
        modalOpen.setState({modalIsOpen: true})

        
    }

    
    
    

    function handleColorChange(event){
        setColor(event.target.value);

    }

return (
    <div className={styles.container}>
        <h1>COLOR PICKER!</h1>





        <div className={styles.ColorDisplay} style= {{backgroundColor: color}}>

        </div>

        <Button onClick={handleOpenModal}>
            also
            
           
        </Button>

    

               
    
        
        <p>Color seleccionado:</p>
        <label> Seleccione un color: </label>

        <input type="color" value={color} onChange={handleColorChange}/>
        
    </div>
)

}

export default ColorPicker