import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,} from 'reactstrap';

import React, { useState, forwardRef, useImperativeHandle } from "react"



const AddNote = forwardRef((props, ref) => {
  const [modalState, setModalState] = useState(false);
  const [noteContents, setNoteContents] = useState("");
  const [buttonColor, setButtonColor] = useState("secondary");

  const modalTitle = "Add note at my location:";

  // Pass back this function to parent component
  // Parent component can toggle modal on when Add Note button is pressed
  useImperativeHandle( ref,() => ({
    createNote(e) {
      toggle();
    }
    }),
  )

  // Change submit button colour to grey if no text entered
  const handleTextChange = (e) => {
    if(e.target.value === "") {
      setButtonColor("secondary");
    } else {
      setButtonColor("primary");
    }
    setNoteContents(e.target.value);
  }


  // submitNote functino is passed via props. It will send note to server and update locally too
  function addNote() {
    toggle();
    if(noteContents != "") {
      props.submitNote(noteContents);
    }
  }

  function toggle() { setModalState(!modalState); }

  return(
    <Modal isOpen={modalState} toggle={toggle}>
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>
        <Input type="textarea" name="text" id="exampleText" placeholder="Start writing..." value={noteContents} onChange={handleTextChange}/>
      </ModalBody>
      <ModalFooter>
        <Button color={buttonColor} onClick={addNote}>Submit</Button>{' '}
      </ModalFooter>
    </Modal>
  )
})

export default AddNote;