import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

interface CenterMapProps {
    position: [number, number];
}

const CenterMap: React.FC<CenterMapProps> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(position, map.getZoom(), { animate: true });
    }, [position, map]);

    return null;
};

export default CenterMap;
