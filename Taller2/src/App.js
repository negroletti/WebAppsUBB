import React from "react";
import ListaAutos from "./Components/ListaAutos";
import EditarAutos from "./Components/EditarAutos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "./Styles/estiloPrincipal.css";
import "primeicons/primeicons.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ListaAutos />} />
                <Route exact path="/editar/:id" element={<EditarAutos />} />
                <Route exact path="/agregar" element={<EditarAutos />} />
            </Routes>
        </Router>
    );
}

export default App;
