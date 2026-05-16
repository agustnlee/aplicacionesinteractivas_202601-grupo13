
    import Button from "../ui/Button" ;
    import React from "react";
import styles from "./ColorPicker.module.css";
import Modal from "./Modal";
    

    function ColorPallete(){
        const[colorsOpen, setColorsOpen]= useState(false);

        const open = Boolean(colorsOpen);
        
        
      
        return( 
        
        <>

         <div className={styles.container}>
                <h1>COLOR PICKER!</h1>

                <Button>
                    hey
                </Button>




     
        </div>
        </> );
    }
    export default ColorPallete; 
     
     
     
     
     