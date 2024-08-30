import React, { useEffect } from "react";
import { useStore } from "../store/useStore";

interface CalculateButtonProps {
    onClick: () => void;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ onClick }) => {
    const distance = useStore((state) => state.distance);
    const setDistance = useStore((state) => state.setDistance);

    return (
        <>
            {distance != 0 && (
                <button
                    onClick={onClick}
                    className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Рассчитать
                    {/* {distance} */}
                </button>
            )}
        </>
    );
};

export default CalculateButton;
