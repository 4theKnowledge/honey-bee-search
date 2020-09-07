import React from 'react';
import '../App.css';

function Citation() {
    return(
      <div className="container">
        <p>
          Honey Bee Proteome Search is offered to the public as a freely acessible web server.
          This tool is based on the honey bee proteome ID TBA (available on <a id="link" href="https://blast.ncbi.nlm.nih.gov/Blast.cgi" target="_blank" rel="noopener noreferrer">NCBI Blast</a>).
        </p>
        <hr/>
        <p>If you use this resource in your research, please cite:</p>
            <em>
              Bikaun, J., Bikaun, T. and Grassl, J. Honey Bee Proteome Search: Automated Peptide Classification. Journal of xyz, 2020.
            </em>
            <br/>
            <a id="link" href="!#" rel="noopener noreferrer">
              DOI: TBA
            </a>
      </div>
    )
}

export default Citation;