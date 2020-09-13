import React from 'react';
import '../../stylesheets/ResultModal.css';

function InteractiveImage ({value, caption, opacity}) {

    return (
        <div className="interactiveImage">
            <i class="fab fa-forumbee" style={{fontSize: value, color: "orange", opacity: opacity}}></i>
            <figcaption>{ caption }</figcaption>
        </div>
    );
}

export default InteractiveImage