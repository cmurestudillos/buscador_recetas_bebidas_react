import React from 'react';
// Estilos CSS - Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Componentes
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';
import Footer from './components/Footer';
// Context
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <Formulario />
                </div>
                <ListaRecetas />
            </div>
            <Footer />
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
