// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import L from "leaflet";

// interface MapSelectorProps {
//     onLocationSelect: (lat: number, lng: number) => void;
// }

// const shopLocation: any = [55.751244, 37.618423]; // Координаты вашего магазина

// const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect }) => {
//     const [markerPosition, setMarkerPosition] = useState<any | null>(null);

//     const MapClickHandler = () => {
//         useMapEvents({
//             click(event) {
//                 const lat = event.latlng.lat;
//                 const lng = event.latlng.lng;
//                 setMarkerPosition(event.latlng);
//                 onLocationSelect(lat, lng);
//             },
//         });
//         return null;
//     };

//     return (
//         <MapContainer
//             center={shopLocation}
//             zoom={10}
//             style={{ height: "400px", width: "100%" }}>
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {markerPosition && <Marker position={markerPosition} />}
//             <Marker position={shopLocation} />
//             <MapClickHandler />
//         </MapContainer>
//     );
// };

// export default MapSelector;
