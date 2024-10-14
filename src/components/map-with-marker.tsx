import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CenterMap from "../components/center-map.tsx";
import CustomMarker from "../components/custom-marker.tsx";
import useRemoveAttribution from "../hooks/useRemoveAttribution";
import { shopLocation } from "../utils/constants";

interface MapWithMarkerProps {
    latitude: number;
    longitude: number;
}

const MapWithMarker = ({ latitude, longitude }: MapWithMarkerProps) => {
    const position: [number, number] = [latitude, longitude];

    useRemoveAttribution();

    return (
        <MapContainer
            center={position}
            zoom={15}
            className="w-full h-48 rounded-lg">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
            />
            <CenterMap position={position} />
            {position[0] !== shopLocation.lat &&
                position[1] !== shopLocation.lng && (
                    <CustomMarker position={position} label="Вы здесь" />
                )}
            <CustomMarker
                position={[shopLocation.lat, shopLocation.lng]}
                label="Мы тут"
            />
        </MapContainer>
    );
};

export default MapWithMarker;
