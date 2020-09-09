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
      minWidth: '50%',
      minHeight: '25%'
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
            <h5 className="sequenceTitle">Sequence</h5>
            <div className="sequenceContainer">
                { sequence }
            </div>
            <h5 className="descriptionTitle">Description</h5>
            <div className="descriptionContainer">
                { description }  
            </div>

            <button className="btn-modal-content" onClick={ closeModal }>close</button>
            </Modal>
        </div>
    );

}

export default ResultModal