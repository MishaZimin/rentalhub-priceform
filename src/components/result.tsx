import React from "react";

interface ResultDisplayProps {
    cost: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ cost }) => {
    return (
        <div className="mx-auto mt-2 text-center ">
            <p className="text-lg font-bold">Стоимость доставки: {cost} руб.</p>
        </div>
    );
};

export default ResultDisplay;
