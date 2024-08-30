import React, { useState } from "react";
import axios from "axios";
import MapWithMarker from "./map-with-marker";
import { useStore } from "../store/useStore";

interface AddressInputProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onLocationSelect }) => {
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [latt, setLat] = useState<number>(1);
    const [lngg, setLng] = useState<number>(1);
    const [isAddressChecked, setIsAddressChecked] = useState<boolean>(false);

    const distance = useStore((state) => state.distance);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        // Сброс состояния проверки адреса, когда пользователь изменяет поле
        setIsAddressChecked(false);
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
                setLat(parseFloat(lat));
                setLng(parseFloat(lon));
                onLocationSelect(parseFloat(lat), parseFloat(lon));
                setError(null);
                setIsAddressChecked(true); // Устанавливаем флаг, что адрес был проверен
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
                    className="w-full p-2 border rounded-md"
                />
                <button
                    type="submit"
                    className="p-2 mt-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Проверить адрес
                </button>
            </form>
            {error && <p className="mb-2 text-red-500">{error}</p>}
            {isAddressChecked && latt !== 1 && (
                <>
                    <div className="rounded-xl">
                        <MapWithMarker latitude={latt} longitude={lngg} />
                    </div>
                    <div className="mb-2">
                        {distance !== 0 && (
                            <>
                                <p>Расстояние: {distance.toFixed(1)} км</p>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AddressInput;
