import React, { useState } from 'react';
import '../ResultModal.css';

function InteractiveImage ({value, caption}) {

    return (
        <div className="interactiveImage">
            <i class="fab fa-forumbee" style={{fontSize: value}}></i>
            <figcaption>{ caption }</figcaption>
        </div>
    );
}

export default InteractiveImage