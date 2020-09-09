import React, { useState } from 'react';
import '../ResultModal.css';
import Modal from 'react-modal';
import HighlightText from './HighlightText';

// Randomly generate colour based on hased string
// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase()

    // console.log(c)
    return "#"+c
    // return "00000".substring(0, 6 - c.length) + c;
}


// Modal inline styling
const customStyles = {
    overlay: {
        backgroundColor: 'grey'
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
      maxWidth: '550px'
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

    // Div color
    const bgColor = intToRGB(hashCode(name));

    return (
        <div className="modal-container"title={ "Name: " + name + "\nDescription: " + description}>
            <button className="btn-modal-open" id={{ name }}onClick={ openModal } style={{backgroundColor: bgColor}}></button>
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
            <textarea className="sequenceContainer">
                { sequence }
            </textarea>
            <button className="btn-modal-content" onClick={ closeModal }>close</button>
            </Modal>
        </div>
    );

}

export default ResultModal