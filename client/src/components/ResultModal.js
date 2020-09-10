import React, { useState } from 'react';
import '../ResultModal.css';
import Modal from 'react-modal';
import HighlightText from './HighlightText';

// Randomly generate colour based on hased string
// https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
String.prototype.toRGB = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}



// Modal inline styling
const customStyles = {
    overlay: {
        // backgroundColor: 'grey'
    },
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '50%',
      maxHeight: '50%',
      maxWidth: '750px'
    }
  };

// Bind modal to parent element
Modal.setAppElement('#root');

function ResultModal ({partialSequence, name, sequence, description}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function setOpacity(e) {
        const btnList = document.getElementById('search-results').querySelectorAll(".btn-modal-open");
        
        btnList.forEach((btn) => {
            if (btn.getAttribute('attr') == e.target.getAttribute('attr')) {
                //pass
            } else {
                btn.style.opacity=0.25;
            }
        })
    }

    function resetOpacity(e) {
        const btnList = document.getElementById('search-results').querySelectorAll('.btn-modal-open');
        btnList.forEach((btn) => {
            btn.style.opacity=1.0;
        })

    }

    return (
        <div className="modal-container"title={ "Name: " + name + "\nDescription: " + description}>
            <button
                className="btn-modal-open"
                attr={ name }
                onClick={ openModal }
                style={{ backgroundColor: name.toRGB() }}
                onMouseEnter={ setOpacity }
                onMouseLeave={ resetOpacity }
                >

            </button>
            <Modal 
                isOpen={ modalIsOpen }
                onRequestClose={ closeModal }
                style = { customStyles }
                contentLabel = "Example Modal"
            >
            <h2 className="modal-title"> { name }</h2>
            <hr/>
            <h5 className="subtitle">Description</h5>
            <div className="descriptionContainer">
                { description }
            </div>
            <h5 className="subtitle">Sequence</h5>
            < HighlightText searchTerm= { partialSequence } text={ sequence } />
            {/* <textarea className="sequenceContainer"> */}
                {/* { sequence } */}
            {/* </textarea> */}
            <button className="btn-modal-content" onClick={ closeModal }>close</button>
            </Modal>
        </div>
    );

}

export default ResultModal