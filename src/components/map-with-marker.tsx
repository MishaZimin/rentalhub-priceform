import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

interface MapWithMarkerProps {
    latitude: number;
    longitude: number;
}

interface CustomMarkerProps {
    position: [number, number];
    label: string;
}

const shopLocation = {
    lat: 56.817676,
    lng: 60.608335,
};

const CenterMap: React.FC<{ position: [number, number] }> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(position, map.getZoom(), { animate: true });
    }, [position, map]);

    return null;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, label }) => {
    const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
            <>
                <div className="flex flex-col w-[100px]">
                    <div className="mx-auto font-bold text-center text-black">
                        {label}
                    </div>

                    <div className="w-full mx-auto">
                        <FaMapMarkerAlt
                            className="mx-auto"
                            style={{ color: "black", fontSize: "24px" }}
                        />
                    </div>
                </div>
            </>
        ),
        iconSize: [25, 41],
        iconAnchor: [50, 42],
        className: "custom-icon",
    });

    return <Marker position={position} icon={customIcon} />;
};

const MapWithMarker: React.FC<MapWithMarkerProps> = ({
    latitude,
    longitude,
}) => {
    const position: [number, number] = [latitude, longitude];

    useEffect(() => {
        const attributionControl = document.querySelector(
            ".leaflet-control-attribution"
        ) as HTMLElement;
        if (attributionControl) {
            attributionControl.style.display = "none";
        }
    }, []);

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
            {position[0] != shopLocation.lat &&
                position[1] != shopLocation.lng && (
                    <CustomMarker position={position} label="Вы здесь" />
                )}
            {/* Используем CustomMarker и передаем label */}
            <CustomMarker
                position={[shopLocation.lat, shopLocation.lng]}
                label="Мы тут"
            />
        </MapContainer>
    );
};

export default MapWithMarker;
