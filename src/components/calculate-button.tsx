import React from "react";

interface CalculateButtonProps {
    onClick: () => void;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Рассчитать
        </button>
    );
};

export default CalculateButton;
