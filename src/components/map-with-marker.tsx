import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapWithMarkerProps {
    latitude: number;
    longitude: number;
}

const CenterMap: React.FC<{ position: [number, number] }> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(position, map.getZoom(), { animate: true });
    }, [position, map]);

    return null;
};

const MapWithMarker: React.FC<MapWithMarkerProps> = ({
    latitude,
    longitude,
}) => {
    // Корректно создаем кортеж из двух чисел
    const position: [number, number] = [latitude, longitude];

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <CenterMap position={position} />
            <Marker
                position={position}
                icon={L.icon({
                    iconUrl:
                        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                })}>
                <Popup>
                    Latitude: {latitude}
                    <br />
                    Longitude: {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapWithMarker;
