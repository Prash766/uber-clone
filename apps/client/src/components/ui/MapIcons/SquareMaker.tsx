import L from "leaflet";

const SquareMarker = L.divIcon({
  html: `<div style="
    width: 12px;
    height: 12px;
    background: black;
    position: relative;
  ">
    <div style="
      width: 4px;
      height: 4px;
      background: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    ">
    </div>
  </div>`,
  className: 'custom-div-icon',
  iconSize: [12, 12],
  iconAnchor: [6, 6], // Center of the icon
  popupAnchor: [0, -6] // Above the icon
});

export default SquareMarker;