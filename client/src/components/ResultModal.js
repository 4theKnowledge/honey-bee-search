import React, { useState } from 'react';
import '../ResultModal.css';
import Modal from 'react-modal';
import HighlightText from './HighlightText';
import InteractiveImage from './InteractiveImage';


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

function ResultModal ({partialSequence, name, sequence, description, setHoverElement, resetHoverElement, hoveredElement}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    function openModal() {setModalIsOpen(true)}
    function closeModal() {setModalIsOpen(false)}
    const opaque = hoveredElement === name || hoveredElement == null;
    
    return (
        <div className="modal-container" title={ "Name: " + name + "\nDescription: " + description}>
            <button
                className="btn-modal-open"
                attr={ name }
                onClick={ openModal }
                style={{ backgroundColor: name.toRGB(), opacity: (opaque ? 1 : 0.1)}}
                onMouseEnter={() => setHoverElement(name) }
                onMouseLeave={() => resetHoverElement() }
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
                <HighlightText searchTerm= { partialSequence } text={ sequence } />
                <h5 className="subtitle">Pathway</h5>
                <div>Something about pathways will come here...</div>
                <h5 className="subtitle">Distribution</h5>
                <div>Something goes here with drone, queen and worker svg</div>
                <div className="beeImages">
                    <InteractiveImage value={ 100 } caption = { 'Drone' }/>
                    <InteractiveImage value={ 100 } caption = { 'Worker' }/>
                    <InteractiveImage value={ 100 } caption = { 'Queen' }/>
                </div>
                <button className="btn-modal-content" onClick={ closeModal }>close</button>
            </Modal>
        </div>
    );
}

export default ResultModal