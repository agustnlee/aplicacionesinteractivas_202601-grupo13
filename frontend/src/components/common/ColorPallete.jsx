
import Button from "../ui/Button" ;
import React, { use } from "react";
import styles from "./ColorPallete.module.css";


import { useState } from "react";

export default function ColorPallete(){

       const [color, setColor]= useState("#FFFFFF");
    

    
    const colorArray =[
        "#e6c229",
        "#f17105",
        "#d11149",
        "#6610f2",
        "#1a8fe3",
        "#04e762",

    ];

    console.log("setColor", color);

    return(<>
    <div >
        elija un color:

         <div className= {styles.container}>

               {colorArray?.map((color) => (
                <div className={styles.ColorDisplay} onClick={()=> setColor(color)} style= {{backgroundColor: color}}></div>
               ))}

              
 
 <div className={styles.container2}  style={{backgroundColor: color}}>

    color seleccionado
 </div></div> </div></>);
}

   



    