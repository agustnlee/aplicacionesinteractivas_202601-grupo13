
import Button from "../ui/Button" ;
import IconButton from "../ui/IconButton";
import React, { use } from "react";
import styles from "./ColorPalette.module.css";
import { useState } from "react";
import { ICONS } from "../../utils/icontypes";


export default function ColorPalette({ onConfirm }){

       const [color, setColor]= useState("var(--border)");
       const [isOpen, setIsOpen] = useState(false);

       
 const handleConfirm = (colorElegido) => {
     
        if(onConfirm) {
            onConfirm(colorElegido);
        }
        setIsOpen(false);
    }

    

    
    const colorArray =[
        "#d72b31",
        "#e94a22",
        "#f69e31",
        "#e8fa42",
        "#60c04c",
        "#21917b",
        "#225575",
        "#5f3675",

    ];

    console.log("setColor", color);

    return(<>
    <div >

        <IconButton 
                variant="primary" 
                icon= "palette"
                onClick={() => setIsOpen(!isOpen)}
            >
                


            </IconButton>

            {isOpen && (
                <div style={{ marginTop: '15px' }}>
                    <p style={{ marginBottom: '10px' }}>Elija un color:</p>

                    <div className={styles.container}>
                        {colorArray?.map((colorValue, index) => (
                            <div 
                                key={index} // Importante para que React no se queje
                                className={styles.ColorDisplay} 
                                onClick={() => [setColor(colorValue), handleConfirm(colorValue)]} 
                                
                                style={{ backgroundColor: colorValue }}
                            >
                                
                            </div>
                        ))}

                        <div 
                            className={styles.container2} 
                            style={{ backgroundColor: color }}
                        >
                            
                           
                        </div>
                    </div>
                </div>
            )}
        </div>
        
         </>
    );
}
        






    