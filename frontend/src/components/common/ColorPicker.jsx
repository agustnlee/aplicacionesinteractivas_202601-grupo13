import React from "react";
import styles from "./ColorPicker.module.css";
import { useState } from "react";



const ColorPicker = ()=> {

    const [color, setColor]= useState("#FFFFFF");

    function handleColorChange(event){
        setColor(event.target.value);

    }

return (
    <div className={styles.container}>
        <h1>COLOR PICKER!</h1>

        <div className={styles.ColorDisplay} style= {{backgroundColor: color}}>

       
        </div>
        
        <p>Color seleccionado:</p>
        <label> Seleccione un color: </label>

        <input type="color" value={color} onChange={handleColorChange}/>
        
    </div>
)

}

export default ColorPicker