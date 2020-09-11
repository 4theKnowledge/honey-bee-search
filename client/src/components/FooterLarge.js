import React, { Component } from 'react';
import '../stylesheets/App.css';

class FooterLarge extends Component {
    render() {
        return(
            <footer className="page-footer font-small special-color-dark pt-4 fixed-bottom">
                <div className="container">
                <ul className="list-unstyled list-inline text-center">
                    <li className="list-inline-item">
                    <a className="btn-floating btn-fb mx-1" href="https://www.facebook.com/CRCforHBP/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f" id="link"> </i>
                    </a>
                    </li>
                    <li className="list-inline-item">
                    <a className="btn-floating btn-tw mx-1" href="https://twitter.com/HoneybeesHealth" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter" id="link"> </i>
                    </a>
                    </li>
                    <li className="list-inline-item">
                    <a className="btn-floating btn-in mx-1" href="https://www.instagram.com/jessica.m.moran" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram" id="link"> </i>
                    </a>
                    </li>
                    <li className="list-inline-item">
                    <a className="btn-floating btn-li mx-1" href="https://www.linkedin.com/company/crc-for-honey-bee-products-ltd" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in" id="link"> </i>
                    </a>
                    </li>
                </ul>
                </div>

                <div className="footer-citation">
                    <em>
                    If you use this resource in your research, please cite: Bikaun, J., Bikaun, T. and Grassl, J. Honey Bee Proteome Search: Automated Peptide Classification. Journal of xyz, 2020.
                    </em>
                    <br/>
                    <a id="link" href="!#" rel="noopener noreferrer">DOI: TBA</a>
                </div>
    
                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a id="link" href="https://www.crchoneybeeproducts.com/" target="_blank" rel="noopener noreferrer"> Honey Bee Health Research Group (Grassl Lab)</a>
                </div>
    
            </footer>
        )

    }
}

export default FooterLarge;