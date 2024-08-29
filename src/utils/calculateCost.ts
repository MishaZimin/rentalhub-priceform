interface CalculateCostParams {
    timeOfDay: string;
    distance: string;
    carryUpstairs: boolean;
}

const calculateCost = ({
    timeOfDay,
    distance,
    carryUpstairs,
}: CalculateCostParams): number => {
    const baseCostPerKm = 50;
    const carryUpstairsCost = 200;
    const distanceCost = baseCostPerKm * (parseInt(distance) || 0);

    let timeOfDayMultiplier = 1;
    switch (timeOfDay) {
        case "day":
            timeOfDayMultiplier = 1.1;
            break;
        case "evening":
            timeOfDayMultiplier = 1.2;
            break;
        case "night":
            timeOfDayMultiplier = 1.3;
            break;
        default:
            timeOfDayMultiplier = 1;
    }

    let totalCost = distanceCost * timeOfDayMultiplier;

    if (carryUpstairs) {
        totalCost += carryUpstairsCost;
    }

    return Math.round(totalCost);
};

export default calculateCost;
