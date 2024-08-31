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
            <div className="ml-[2px] border-0 border-red-700">
                <label className="block mb-0">Время суток</label>
                <div className="flex flex-col justify-between mb-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="timeOfDay"
                            value="morning"
                            checked={value === "morning"}
                            onChange={onChange}
                            className="mr-2 accent-black"
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
                            className="mr-2 accent-black"
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
                            className="mr-2 accent-black"
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
                            className="mr-2 accent-black"
                        />
                        Ночь
                    </label>
                </div>
            </div>
        </>
    );
};

export default TimeOfDaySelector;
