import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Orders from "./components/orders";
import OrderList from "./components/orderList";
import OrderDetails from "./components/orderDetails";

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
    <ul>
        <li>
            <Link to="/">Login</Link>
        </li>
        <li>
            <Link to="/orders">Orders</Link>
        </li>
    </ul>
);

export default App;