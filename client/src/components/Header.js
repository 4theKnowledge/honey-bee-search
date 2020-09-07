import React from 'react';
import '../App.css';

function Header() {
    return(
        <div className="jumbotron jumbotron-billboard">
        <div className="img"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Honey Bee Proteome Search</h1>
              <p>Find honey bee peptides by partial sequence matching</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header;