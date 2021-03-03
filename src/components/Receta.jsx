import React, { useContext, useState } from 'react';
// Context
import { ModalContext } from '../context/ModalContext';
// Ventana Modal
import Modal from '@material-ui/core/Modal';
// Estilos CSS Material-UI
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: '90%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    scroll: { maxHeight: '700px', overflowY: 'scroll', overflowX: 'none' }
}));

const Receta = ({receta}) => {

    // Configuración del modal de material-ui
    const [ modalStyle ] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    // extraer los valores del context
    const { informacion, guardarIdReceta, guardarReceta } = useContext(ModalContext);

    // Muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if( informacion[`strIngredient${i}`] ) {
                ingredientes.push(
                    <li key={i}> { informacion[`strIngredient${i}`] }  { informacion[`strMeasure${i}`] }</li>
                )
            }
        }

        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                 <h2 className="card-header">{receta.strDrink}</h2>
                 <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />
                 <div className="card-body">
                     <button type="button" className="btn btn-block btn-outline-primary" onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }} >  Ver Receta
                     </button>


                     <Modal open={open} onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({})
                            handleClose();
                        }} >
                         <div style={modalStyle} className={classes.paper}>
                            <div className={ classes.scroll }> 
                                <h2 className="mt-5">{informacion.strDrink}</h2>
                                    <h4 className="badge badge-primary mt-4">Instrucciones</h4>
                                    <hr></hr>
                                    <p> {informacion.strInstructions} </p>
                                    <img className="card-img-top my-4 shadow p-3 mb-5 bg-body border rounded" alt={informacion.strDrink} src={informacion.strDrinkThumb} />
                                    <h4 className="badge badge-primary">Ingredientes y cantidades</h4>
                                    <hr></hr>
                                    <ul>
                                        { mostrarIngredientes(informacion) }
                                    </ul>          
                                    <button className="btn btn-outline-primary btn-block mb-5" onClick={() => handleClose()}>Cerrar</button>              
                            </div>
                         </div>
                     </Modal>
                 </div>
            </div>
        </div>
     );
}
 
export default Receta;