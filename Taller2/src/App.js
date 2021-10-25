import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MiComponente from "./vistas/formulario/MiComponente";
import Componente2 from "./vistas/formulario/Componente2";
import { NavLink } from "react-router-dom";

function App() {
    function Navbar() {
        return (
            <nav className="topnav">
                <NavLink to="/otro" activeClassName="active">
                    Integrantes
                </NavLink>
                <NavLink to="/personas" activeClassName="active">
                    Personas
                </NavLink>
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
