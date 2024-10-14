interface RadioButtonProps {
    label: string;
    value: string;
    selectedValue: string;
    onChange: (e: any) => void;
}

const RadioButton = ({
    label,
    value,
    selectedValue,
    onChange,
}: RadioButtonProps) => {
    return (
        <label className="flex items-center">
            <input
                type="radio"
                name="timeOfDay"
                value={value}
                checked={selectedValue === value}
                onChange={onChange}
                className="mr-2 cursor-pointer accent-black"
            />
            {label}
        </label>
    );
};

export default RadioButton;
