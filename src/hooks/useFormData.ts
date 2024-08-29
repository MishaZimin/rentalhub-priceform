import { useState } from "react";

interface FormData {
    timeOfDay: string;
    distance: string;
    carryUpstairs: boolean;
}

const useFormData = () => {
    const [formData, setFormData] = useState<FormData>({
        timeOfDay: "morning",
        distance: "",
        carryUpstairs: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return {
        formData,
        handleInputChange,
    };
};

export default useFormData;
