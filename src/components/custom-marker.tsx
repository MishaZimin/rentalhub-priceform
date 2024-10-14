import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

interface CustomMarkerProps {
    position: [number, number];
    label: string;
}

const CustomMarker = ({ position, label }: CustomMarkerProps) => {
    const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
            <div className="flex flex-col w-[100px]">
                <div className="mx-auto font-sans font-bold text-center text-black">
                    {label}
                </div>
                <div className="w-full mx-auto">
                    <FaMapMarkerAlt
                        className="mx-auto"
                        style={{ color: "black", fontSize: "24px" }}
                    />
                </div>
            </div>
        ),
        iconSize: [25, 41],
        iconAnchor: [50, 42],
        className: "custom-icon",
    });

    return <Marker position={position} icon={customIcon} />;
};

export default CustomMarker;
