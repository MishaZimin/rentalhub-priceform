import React, { useEffect } from "react";
import { useStore } from "../store/useStore";

interface CalculateButtonProps {
    onClick: () => void;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ onClick }) => {
    const distance = useStore((state) => state.distance);

    return (
        <>
            {distance != 0 && (
                <button
                    onClick={onClick}
                    className="w-full p-2 mt-2 text-black transition duration-200 transform bg-white rounded-lg border-gray-200 hover:border-black border-[2px]">
                    Рассчитать
                </button>
            )}
        </>
    );
};

export default CalculateButton;
