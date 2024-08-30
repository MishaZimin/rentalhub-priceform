// App.tsx
import React from "react";

import TimeOfDaySelector from "./components/time-selector.tsx";
import CarryUpstairsCheckbox from "./components/chekbox.tsx";
import CalculateButton from "./components/calculate-button.tsx";
import ResultDisplay from "./components/result.tsx";
import AddressInput from "./components/address-input.tsx";

import { useDeliveryCalculator } from "./hooks/useDeliveryCalculator.ts";

const App: React.FC = () => {
    const {
        formData,
        cost,
        handleInputChange,
        handleLocationSelect,
        handleCalculateClick,
    } = useDeliveryCalculator();

    return (
        <div className="flex w-full bg-white ">
            <div className="w-[90%] max-w-[400px]  h-auto  mx-auto bg-slate-200 mt-12 p-4 rounded-xl">
                <TimeOfDaySelector
                    value={formData.timeOfDay}
                    onChange={handleInputChange}
                />
                <CarryUpstairsCheckbox
                    checked={formData.carryUpstairs}
                    onChange={handleInputChange}
                />
                <AddressInput onLocationSelect={handleLocationSelect} />
                <CalculateButton onClick={handleCalculateClick} />
                <ResultDisplay cost={cost} />
            </div>
        </div>
    );
};

export default App;
