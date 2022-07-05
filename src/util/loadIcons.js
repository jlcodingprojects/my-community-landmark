import L from 'leaflet';

import marker from "../images/marker.png";
import markerGreen from "../images/markerGreen.png";
import markerGrey from "../images/markerGrey.png";
import markerRed from "../images/markerRed.png";
import markerShadow from "../images/marker-shadow.png";
import numShadow from "../images/num-shadow.png";
import three from "../images/three.png";
import ten from "../images/ten.png";

import edit from "../images/edit.png";

export const editIcon = edit;

export const threeIcon = L.icon({
  iconUrl: three,
  shadowUrl: numShadow,
  iconAnchor: [5, 10],
  shadowAnchor: [5, 15],
  popupAnchor: [10, -44],
  iconSize: [25, 25],
});

export const tenIcon = L.icon({
  iconUrl: ten,
  shadowUrl: numShadow,
  iconAnchor: [5, 10],
  shadowAnchor: [5, 15],
  popupAnchor: [10, -44],
  iconSize: [25, 25],
});

export const markerIcon = L.icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconAnchor: [5, 41],
  shadowAnchor: [5, 41],
  popupAnchor: [10, -44],
  iconSize: [25, 41],
});

export const markerIconGrey = L.icon({
  iconUrl: markerGrey,
  shadowUrl: markerShadow,
  iconAnchor: [5, 35],
  shadowAnchor: [7, 44],
  popupAnchor: [10, -44],
  iconSize: [20, 32],
});
export const markerIconRed = L.icon({
  iconUrl: markerRed,
  shadowUrl: markerShadow,
  iconAnchor: [5, 35],
  shadowAnchor: [7, 44],
  popupAnchor: [10, -44],
  iconSize: [20, 32],
});

export const markerIconG = L.icon({
  iconUrl: markerGreen,
  shadowUrl: markerShadow,
  iconAnchor: [5, 41],
  shadowAnchor: [5, 41],
  popupAnchor: [10, -44],
  iconSize: [25, 41],
});