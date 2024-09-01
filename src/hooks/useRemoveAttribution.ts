import { useEffect } from "react";

const useRemoveAttribution = () => {
    useEffect(() => {
        const attributionControl = document.querySelector(
            ".leaflet-control-attribution"
        ) as HTMLElement;
        if (attributionControl) {
            attributionControl.style.display = "none";
        }
    }, []);
};

export default useRemoveAttribution;
