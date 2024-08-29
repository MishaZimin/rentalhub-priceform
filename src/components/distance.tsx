import React from "react";

interface DistanceInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DistanceInput: React.FC<DistanceInputProps> = ({ value, onChange }) => {
    return (
        <label className="block mb-2">
            Удаленность (км):
            <input
                type="number"
                name="distance"
                value={value}
                onChange={onChange}
                placeholder="Введите расстояние"
                className="w-full p-2 mt-1"
            />
        </label>
    );
};

export default DistanceInput;
