import React, { useState } from "react";
import axios from "axios";
import MapWithMarker from "./map-with-marker";
import { useStore } from "../store/useStore";

interface AddressInputProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const shopLocation = {
    lat: 56.817676,
    lng: 60.608335,
};

const AddressInput: React.FC<AddressInputProps> = ({ onLocationSelect }) => {
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [latt, setLat] = useState<number>(1);
    const [lngg, setLng] = useState<number>(1);
    const [isAddressChecked, setIsAddressChecked] = useState<boolean>(false);

    const distance = useStore((state) => state.distance);
    const setDistance = useStore((state) => state.setDistance);

    const cost = useStore((state) => state.cost);
    const setCost = useStore((state) => state.setCost);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);

        setIsAddressChecked(false);
        setDistance(0);
        setCost(0);
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
                setIsAddressChecked(true);
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
        <>
            <div className="mb-4">
                <form onSubmit={handleSubmit}>
                    <span>Введите адрес в Екатеринбурге</span>
                    <input
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="мира 19"
                        className="w-full p-2 mt-2 border rounded-md"
                    />
                    <button
                        type="submit"
                        className="p-2 mt-2 mb-2 text-white transition duration-200 transform bg-gray-500 rounded-md hover:bg-gray-700">
                        Проверить адрес
                    </button>
                </form>
                {error && <p className="mb-2 text-red-500">{error}</p>}
                {latt !== 1 && (
                    <>
                        {!isAddressChecked ? (
                            <div className="rounded-xl">
                                <MapWithMarker
                                    latitude={shopLocation.lat}
                                    longitude={shopLocation.lng}
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl">
                                <MapWithMarker
                                    latitude={latt}
                                    longitude={lngg}
                                />
                            </div>
                        )}

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
        </>
    );
};

export default AddressInput;
