// hooks/useDeliveryCalculator.ts
import useFormData from "./useFormData"; // Импортируем наш хук useFormData
import { useState } from "react";
import { useStore } from "../store/useStore";
import calculateCost from "../utils/calculateCost";
import { calculateDistance } from "../utils/calculateDistance";

const shopLocation = {
    lat: 56.817676,
    lng: 60.608335,
};

export const useDeliveryCalculator = () => {
    const { formData, handleInputChange } = useFormData();
    const [cost, setCost] = useState<number>(0);

    const distance = useStore((state) => state.distance);
    const setDistance = useStore((state) => state.setDistance);

    const handleLocationSelect = (lat: number, lng: number) => {
        const distance = calculateDistance(
            shopLocation.lat,
            shopLocation.lng,
            lat,
            lng
        );
        setDistance(distance);
    };

    const handleCalculateClick = () => {
        const totalCost = calculateCost({
            ...formData,
            distance: distance.toString(),
        });
        setCost(totalCost);
    };

    return {
        formData,
        cost,
        distance,
        handleInputChange,
        handleLocationSelect,
        handleCalculateClick,
    };
};
