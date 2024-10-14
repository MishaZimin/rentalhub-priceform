// App.tsx
import React from "react";

import TimeOfDaySelector from "../components/time-selector.tsx";
import CarryUpstairsCheckbox from "../components/chekbox.tsx";
import CalculateButton from "../components/calculate-button.tsx";
import ResultDisplay from "../components/result.tsx";
import AddressInput from "../components/address-input.tsx";

import { useDeliveryCalculator } from "../hooks/useDeliveryCalculator.ts";
import { useStore } from "../store/useStore.ts";

const RentForm = () => {
    const {
        formData,
        handleInputChange,
        handleLocationSelect,
        handleCalculateClick,
    } = useDeliveryCalculator();

    const cost = useStore((state) => state.cost);

    return (
        <div className="flex w-full bg-white ">
            <div className="w-[90%] max-w-[400px] h-auto  mx-auto bg-gray-0 mt-[64px] mb-12 p-[16px] rounded-[16px] bg-card flex flex-col gap-[16px]">
                <TimeOfDaySelector
                    value={formData.timeOfDay}
                    onChange={handleInputChange}
                />
                <AddressInput onLocationSelect={handleLocationSelect} />
                <CarryUpstairsCheckbox
                    checked={formData.carryUpstairs}
                    onChange={handleInputChange}
                />
                <CalculateButton onClick={handleCalculateClick} />
                {cost != 0 && <ResultDisplay cost={cost} />}
            </div>
        </div>
    );
};

export default RentForm;
