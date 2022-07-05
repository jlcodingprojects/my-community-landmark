import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, } from 'reactstrap';

import React, { useState, forwardRef, useImperativeHandle } from "react"



const DisplayNote = forwardRef((props, ref) => {
  const [modalState, setModalState] = useState(false);
  const [modelText, setModalText] = useState("default note text");
  const [modalTitle, setModalTitle] = useState("default note title");

  // Modal can be called by parent
  useImperativeHandle( ref,() => ({
    displayMessage(e) {
      setModalText(e.text);
      setModalTitle(e.title);
      toggle();
    }
    }),
  )


  function toggle() { setModalState(!modalState); }

  return(
    <Modal isOpen={modalState} toggle={toggle}>
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>
        {modelText}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Nice!</Button>{' '}
      </ModalFooter>
    </Modal>
  )
})

export default DisplayNote;