import React, { useEffect } from "react";
import { useStore } from "../store/useStore";

interface CalculateButtonProps {
    onClick: () => void;
}

const CalculateButton = ({ onClick }: CalculateButtonProps) => {
    const distance = useStore((state) => state.distance);

    return (
        <>
            {distance != 0 && (
                <button
                    onClick={onClick}
                    className="w-full py-[8px] px-[8px] text-black transition duration-300 transform bg-white rounded-lg border-graphite border-opacity-20 hover:border-opacity-40 border-[1px]">
                    Рассчитать
                </button>
            )}
        </>
    );
};

export default CalculateButton;
