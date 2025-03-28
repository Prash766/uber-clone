import L from 'leaflet';

const VehicleMapMarker = (vehicleMapImg: string) => L.divIcon({
    html: `
    <div style="
        background-color: transparent;
        transform: rotate(0deg);
        width: 32px;
        height: 32px;
    ">
        <img style="
            width: 100%;
            height: 100%;
            object-fit: contain;
            transform: rotate(0deg);
        " src="${vehicleMapImg}" />
    </div>
    `,
    iconSize: [32, 32],      
    iconAnchor: [16, 32],   
    className: 'vehicle-marker'
});

export default VehicleMapMarker;