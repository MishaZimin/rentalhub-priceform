import React from "react";

interface CarryUpstairsCheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarryUpstairsCheckbox = ({
    checked,
    onChange,
}: CarryUpstairsCheckboxProps) => {
    return (
        <label className="block ">
            <input
                type="checkbox"
                name="carryUpstairs"
                checked={checked}
                onChange={onChange}
                className="mr-1 transition duration-300 transform cursor-pointer accent-black"
            />
            Нужен занос на этаж
        </label>
    );
};

export default CarryUpstairsCheckbox;
