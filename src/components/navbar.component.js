import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    
    render() { 
        return ( 
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Create User</Link> 
                    </li>
                    <li>
                        <Link to="/userlist" className="nav-link">List Users</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Exercise Log</Link>
                    </li>
                    <li className="navbar-link">
                        <Link to="/" className="nav-link">Exercises</Link>
                    </li>
                </ul>
                </div>
            </nav>
         );
    }
}
 
export default Navbar;