// hooks/useFormData.ts
import { useState } from "react";

interface FormState {
    timeOfDay: string;
    carryUpstairs: boolean;
    [key: string]: any;
}

const useFormData = () => {
    const [formData, setFormData] = useState<FormState>({
        timeOfDay: "morning",
        carryUpstairs: false,
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = event.target;
        const checked = (event.target as HTMLInputElement).checked;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return {
        formData,
        handleInputChange,
    };
};

export default useFormData;
