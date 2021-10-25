import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MiComponente from "./vistas/formulario/MiComponente";
import Componente2 from "./vistas/formulario/Componente2";

function App() {
    function Navbar() {
        return (
            <nav className="topnav">
                <Link to="/otro">Integrantes</Link>
                <Link to="/personas">Personas</Link>
            </nav>
        );
    }

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/otro" component={Componente2} />
                <Route path="/personas" component={MiComponente} />
            </Switch>
        </Router>
    );
}

export default App;
