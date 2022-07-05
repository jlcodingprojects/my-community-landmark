// This function is for components to communicate between each other 
import { useRef, useState, useEffect } from "react";

// Leaflet is our mapping library
import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet';

// Custom Components
import DisplayNote from "./DisplayNote";
import AddNote from "./AddNote";
import { MarkerContainer } from "./MarkerContainer";
import AppBar from "./AppBar";

import UserLocation from "./UserLocation";

import { sessionGetName, sessionGetPosition, localGetOwner } from "../util/sessionManager";


function Landmarks(props) {
  // Methods provided by child components
  const messageProvider = useRef();
  const forceUpdateProvider = useRef();
  const createNoteProvider = useRef();

  const [notes, setNotes] = useState();

  // Popup modal for note
  const displayMessage = (e) => {
    messageProvider.current.displayMessage(e);
  }

  // Redraw map (used when new data is downloaded or notes added)
  const forceUpdate = (e) => {
    forceUpdateProvider.current.forceUpdate();
  }

  // Popup modal to write a note
  const createNote = (e) => {
    createNoteProvider.current.createNote();
  }

  // Adds note to local list and submits to server
  const submitNote = (noteText) => {
    var pos = sessionGetPosition(); //location supplied by browser
    const posArray = [pos.lat, pos.lng];

    var tempNote = {
      owner: localGetOwner(),
      name: sessionGetName(),
      text: noteText,
      position: posArray
    }

    var temp = notes;
    temp.push(tempNote);
    setNotes(temp);
    sendNoteAPI(tempNote);

    forceUpdate(); //update map after adding note. Should be un
  }

  //call API a single time upon map load
  useEffect(() => {
      callAPI();
  }, []);

  // fetch data and setState containing notes
  
  const callAPI = (e) => {
    fetch("https://my-json-server.typicode.com/jlcodingprojects/json-hosting-mcl/notes")
      .then(response=>response.json())
      .then(data => setNotes(data))
  }

  // Convert note given in parameter to json and submit to server
  const sendNoteAPI = (note) => {
    const fetchPostConfig = {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "appication/json"
      },
      body: JSON.stringify(note)
    };

    fetch("https://my-json-server.typicode.com/jlcodingprojects/json-hosting-mcl/notes", fetchPostConfig)
    .then(response => response.json())
  }

  

  // Our MarkerContainer component passes a reference to its update method
  // Pass this update method to the AppBar so it can automatically re-render the marker list when applying filters
  return (
    <div>
      <AppBar forceUpdate = {forceUpdate} createNote = {createNote}/>
      <DisplayNote ref={messageProvider}/>
      <AddNote ref={createNoteProvider} submitNote = {submitNote}/>

      <MapContainer
        center={[-27.470125, 153.021072]}
        zoom={12}
        scrollWheelZoom={true}
        trackResize={true}
        wheelPxPerZoomLevel={120}
        zoomSnap={0.5}
        zoomDelta={0.5}
        maxZoom={15}
        minZoom={6}>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

        <MarkerContainer displayMessage = {displayMessage} ref={forceUpdateProvider} notes = {notes} callAPI = {callAPI}/>
        <UserLocation />

      </MapContainer>
    </div>
    
  )
}

export default Landmarks;