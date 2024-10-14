import RadioButton from "../ui/radio-button.tsx";

interface TimeOfDaySelectorProps {
    value: string;
    onChange: (e: any) => void;
}

const TimeOfDaySelector = ({ value, onChange }: TimeOfDaySelectorProps) => {
    return (
        <div className="ml-[2px] flex flex-col gap-[4px]">
            <label className="block ">Время суток:</label>
            <div className="flex flex-row gap-10">
                <div>
                    <RadioButton
                        label="Утро"
                        value="morning"
                        selectedValue={value}
                        onChange={onChange}
                    />
                    <RadioButton
                        label="День"
                        value="day"
                        selectedValue={value}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <RadioButton
                        label="Вечер"
                        value="evening"
                        selectedValue={value}
                        onChange={onChange}
                    />
                    <RadioButton
                        label="Ночь"
                        value="night"
                        selectedValue={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default TimeOfDaySelector;
