import React, { createContext, useState, useEffect } from 'react';
// Peticiones HTTP
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState([{ nombre: '', categoria: '' }]);
    const [consultar, guardarConsultar] = useState(false);

    const { nombre, categoria} = busqueda;

    // consulta de la API
    useEffect(() => {
        if(consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado = await axios.get(url);
                // guardar los datos de la consulta en el state
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda]);

    return ( 
        <RecetasContext.Provider value={{ recetas, buscarRecetas, guardarConsultar }} >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;