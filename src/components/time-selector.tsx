import React from "react";

interface TimeOfDaySelectorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeOfDaySelector: React.FC<TimeOfDaySelectorProps> = ({
    value,
    onChange,
}) => {
    return (
        <>
            <label className="block mb-2">Время суток:</label>
            <div className="flex flex-col justify-between mb-4">
                <label className="flex  items-center">
                    <input
                        type="radio"
                        name="timeOfDay"
                        value="morning"
                        checked={value === "morning"}
                        onChange={onChange}
                        className="mr-2"
                    />
                    Утро
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="timeOfDay"
                        value="day"
                        checked={value === "day"}
                        onChange={onChange}
                        className="mr-2"
                    />
                    День
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="timeOfDay"
                        value="evening"
                        checked={value === "evening"}
                        onChange={onChange}
                        className="mr-2"
                    />
                    Вечер
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="timeOfDay"
                        value="night"
                        checked={value === "night"}
                        onChange={onChange}
                        className="mr-2"
                    />
                    Ночь
                </label>
            </div>
        </>
    );
};

export default TimeOfDaySelector;
