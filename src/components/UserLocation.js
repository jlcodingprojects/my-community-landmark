import { useState, useEffect } from "react";

import { useMap } from "react-leaflet"; // import hooks
import { Circle } from "react-leaflet"; // import circle

import { sessionSetPosition } from "../util/sessionManager";


function UserLocation() {
  const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    // On component load, call map.locate function await its completion
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        sessionSetPosition(e.latlng);
      });
      map.locate().on("locationerror", function (e) {
        console.log("Unable to get location");
        setPosition({lat: -26.925, lng: 153.1});
        sessionSetPosition({lat: -26.925, lng: 153.1});
      });
    }, [map]);

    // Draw circle on position found
    return position === null ? null : (
      <Circle center={position} pathOptions={{color: "blue", opacity: "0.9", fillColor: "red"}} radius={200}>
        <Circle center={position} pathOptions={{color: "blue", opacity: "0.2", fillOpacity: "0.5"}} radius={20}></Circle>
      </Circle>
    );
}


export default UserLocation;