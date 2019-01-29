import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login";
import Orders from "./components/orders";

const App = () => (
    <Router>
        <div>
            <Header />
            <Route path="/" exact component={Login} />
            <Route path="/orders" component={Orders} />
        </div>
    </Router>
);

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Point of Sale</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    </nav>
);

export default App;
