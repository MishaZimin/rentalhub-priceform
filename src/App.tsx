import React, { useState } from "react";
import TimeOfDaySelector from "./components/time-selector.tsx";
import DistanceInput from "./components/distance.tsx";
import CarryUpstairsCheckbox from "./components/chekbox.tsx";
import CalculateButton from "./components/calculate-button.tsx";
import ResultDisplay from "./components/result.tsx";

import AddressInput from "./components/AddressInput/AddressInput";
import useFormData from "./hooks/useFormData";
import calculateCost from "./utils/calculateCost";

const shopLocation = {
    lat: 56.8389261,
    lng: 60.6057025,
};

const App: React.FC = () => {
    const { formData, handleInputChange } = useFormData();
    const [cost, setCost] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);

    const handleLocationSelect = (lat: number, lng: number) => {
        const R = 6371; // Радиус Земли в километрах
        const dLat = (lat - shopLocation.lat) * (Math.PI / 180);
        const dLng = (lng - shopLocation.lng) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(shopLocation.lat * (Math.PI / 180)) *
                Math.cos(lat * (Math.PI / 180)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        console.log(distance);
        setDistance(distance);
    };

    const handleCalculateClick = () => {
        const totalCost = calculateCost({
            ...formData,
            distance: distance.toString(),
        });
        setCost(totalCost);
    };

    return (
        <div className="w-[400px] h-auto mx-auto bg-slate-100 mt-20 p-4 rounded-md">
            <TimeOfDaySelector
                value={formData.timeOfDay}
                onChange={handleInputChange}
            />
            <CarryUpstairsCheckbox
                checked={formData.carryUpstairs}
                onChange={handleInputChange}
            />
            <AddressInput onLocationSelect={handleLocationSelect} />
            <div className="mb-2">
                {distance != 0 && (
                    <>
                        <p>Расстояние: {Math.floor(distance)} км</p>
                    </>
                )}
            </div>

            <CalculateButton onClick={handleCalculateClick} />
            <ResultDisplay cost={cost} />
        </div>
    );
};

export default App;
