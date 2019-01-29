import {Link} from "react-router-dom";
import React, {Component} from "react";


class Logout extends Component {

    render() {
        return (
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </div>);
    }

}


export default Logout;