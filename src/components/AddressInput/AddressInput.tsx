import React, { useState } from "react";
import axios from "axios";

interface AddressInputProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const shopLocation = {
    lat: 56.8389261, // Широта магазина
    lng: 60.6057025, // Долгота магазина
};

const AddressInput: React.FC<AddressInputProps> = ({ onLocationSelect }) => {
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const normalizeAddress = (input: string): string => {
        const cleanInput = input.trim().toLowerCase();

        const streetPattern =
            /(\b(улица|ул|пр|шос|просп|пл|туп|кв)\b[\s]*)([^\d]+?)\s*(\d+)/i;
        const housePattern = /\d+/;

        const houseMatch = cleanInput.match(housePattern);
        const houseNumber = houseMatch ? houseMatch[0] : "unknown number";

        let street = "";
        let formattedAddress = "";

        const match = cleanInput.match(streetPattern);
        if (match) {
            const type = match[2] || "улица";
            street = match[3].trim();
            formattedAddress = `${type} ${street}, ${houseNumber}, Екатеринбург`;
        } else {
            street = cleanInput.replace(housePattern, "").trim();
            formattedAddress = `улица ${street}, ${houseNumber}, Екатеринбург`;
        }

        return formattedAddress;
    };

    const handleGeocode = async () => {
        console.log(normalizeAddress(address));
        try {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: {
                        q: `${normalizeAddress(address)}`,
                        format: "json",
                        limit: 1,
                        addressdetails: 1,

                        countrycodes: "RU",
                    },
                }
            );

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                console.log(lat, lon);
                onLocationSelect(parseFloat(lat), parseFloat(lon));
                setError(null);
            } else {
                setError("Адрес не найден");
            }
        } catch (err) {
            setError("Произошла ошибка при геокодировании");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleGeocode();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Введите адрес в Екатеринбурге"
                    className="border p-2 w-full"
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Проверить адрес
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default AddressInput;
