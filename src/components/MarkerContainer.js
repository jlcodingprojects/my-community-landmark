import { useMapEvents, useMap } from 'react-leaflet';
import { useState, useImperativeHandle, forwardRef } from "react";

// Icons for map markers are loaded separately
import { markerIcon, markerIconG } from "../util/loadIcons";

import { localGetOwner, sessionGetFilter, sessionGetTextFilter, sessionSetFilter } from "../util/sessionManager";
import { Marker } from 'react-leaflet';


// This component must be a child of MapContainer. It will populate the map with notes and links the messageProvider to each note
export const MarkerContainer = forwardRef((props, ref) => {
  const map = useMap(); //useMap allows us to override map features
  // Used to force update the component. Means parent and child components can update map after downloading data
  const [triggerUpdate, setTriggerUpdate] = useState(false);


  map.zoomControl.setPosition('bottomleft'); // The zoom control buttons


  // Pass forceUpdate method to parent component
  useImperativeHandle( ref,() => ({
    forceUpdate(e) {
      setTriggerUpdate(!triggerUpdate);
    }
    }),
  )

  // Open note. The displayMessage function is passed from parent
  // The parent received displayMessage function from one of its other child components via imperativeHandle
  const focusOn = (e) => {
    props.displayMessage({text: e.text, title: e.name});
  }

  // Find location on load, update marker list when map is interacted with
  const mapEvent = useMapEvents({
    click() {
      map.locate();
    },
    moveend() {
      //TODO!IMPORTANT: reenable callAPI once it is functional. API calls are disabled while using mock server
      //props.callAPI();
    },
    zoomend() {
      //props.callAPI();
    }
  })

  var content = [];

  // Create a Maker component for each note
  if(props.notes){
    content = props.notes.map((note, index) => {
      var tempIcon = markerIcon;
      var opacity = 1.0;
      var tileActive = true;

      // Make notes different colour if the user is the owner of it
      if(note.owner == localGetOwner()) {
        
        tempIcon = markerIconG;
      }

      // if the "my notes only" option is checked, only display notes owned by user
      if(sessionGetFilter()==="true") {
        if(note.owner != localGetOwner()) {
          tileActive = false;
        }
      }

      // Concatenate name+contents of note. Check if the text filter is present in note
      var textFilter = sessionGetTextFilter().toLowerCase();
      var textTarget = (note.text + note.name).toLowerCase();

      // If text search is present, only display notes containing it
      if(textFilter != "") {
        if(!textTarget.includes(textFilter)) {
          tileActive = false;
        }
      }

      if(tileActive) {
        return (
          <Marker
            key={index}
            position={note.position}
            icon={tempIcon}
            opacity={opacity}
            eventHandlers={{click: () => {focusOn(note)}}}
          />
        );
      }
    });
  }
  
  return (
    <>{content}</>
  )
})
