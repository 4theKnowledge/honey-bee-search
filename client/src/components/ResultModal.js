import React, { useState } from 'react';
import '../ResultModal.css';
import Modal from 'react-modal';

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

function ResultModal ({name, sequence, description}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div className="modal-container"title={ "Name: " + name + "\nDescription: " + description}>
            <button className="btn-modal-open" onClick={ openModal }></button>
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
            <textarea className="sequenceContainer">
                { sequence }
            </textarea>
            <button className="btn-modal-content" onClick={ closeModal }>close</button>
            </Modal>
        </div>
    );

}

export default ResultModal