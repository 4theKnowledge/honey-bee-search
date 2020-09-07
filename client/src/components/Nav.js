import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

function Nav() {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
    <a className="navbar-brand" href="!#">
        <span><img src="\HBH.png" width="15%" alt="HBH Logo"/></span>
        Grassl Lab
    </a>    
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
        <Link to="/">
        <a className="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
        </Link>
        {/* <Link to="/about">
        <a className="nav-item nav-link" href="/about">About</a>
        </Link> */}
        <Link to="/search">
        <a className="nav-item nav-link" href="/search">Search</a>
        </Link>
        </div>
        </div>
    </nav>
    );   
}

export default Nav;