import React, { useContext } from 'react';
// Componentes
import Receta from './Receta';
// Context
import { RecetasContext } from '../context/RecetasContext';

const ListaRecetas = () => {

    // extraer las recetas
    const { recetas } = useContext(RecetasContext);

    return ( 
        <div className="row mt-5">
            {recetas.map(receta => (
                <Receta key={receta.idDrink} receta={receta} />
            ))}
        </div>
     );
}
 
export default ListaRecetas;