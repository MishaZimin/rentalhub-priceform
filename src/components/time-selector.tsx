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
            <div className="ml-[2px] border-0 border-red-700 mb-2">
                <label className="block mb-0 ">Время суток:</label>
                <div className="flex flex-row gap-10">
                    <div>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="timeOfDay"
                                value="morning"
                                checked={value === "morning"}
                                onChange={onChange}
                                className="mr-2 cursor-pointer accent-black"
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
                                className="mr-2 cursor-pointer accent-black"
                            />
                            День
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="timeOfDay"
                                value="evening"
                                checked={value === "evening"}
                                onChange={onChange}
                                className="mr-2 cursor-pointer accent-black"
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
                                className="mr-2 cursor-pointer accent-black"
                            />
                            Ночь
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeOfDaySelector;
