import React from "react";

interface CarryUpstairsCheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarryUpstairsCheckbox: React.FC<CarryUpstairsCheckboxProps> = ({
    checked,
    onChange,
}) => {
    return (
        <label className="block mb-0 ">
            <input
                type="checkbox"
                name="carryUpstairs"
                checked={checked}
                onChange={onChange}
                className="mr-1 cursor-pointer accent-black"
            />
            Нужен занос на этаж
        </label>
    );
};

export default CarryUpstairsCheckbox;
