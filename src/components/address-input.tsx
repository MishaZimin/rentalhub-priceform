import React, { useState } from "react";
import axios from "axios";
import MapWithMarker from "./map-with-marker";
import { useStore } from "../store/useStore";
import { IoSearch } from "react-icons/io5";
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
    const [latt, setLat] = useState<number>(shopLocation.lat);
    const [lngg, setLng] = useState<number>(shopLocation.lng);
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
                <form onSubmit={handleSubmit} className="mb-2">
                    <span className="mb-4">Введите адрес в Екатеринбурге</span>
                    <div className="relative flex flex-row w-full gap-1 mt-1">
                        <input
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Мира 19"
                            className="h-10 p-2 pl-3 rounded-lg w-[90%] focus:outline-none focus:border-black border-[2px] border-gray-200 transition duration-200 transform"
                        />
                        <button
                            type="submit"
                            className="w-10 h-10 p-0 text-black transition duration-200 transform bg-white rounded-lg hover:border-black border-[2px] border-gray-200">
                            <IoSearch className="mx-auto" />
                            {/* Проверить адрес */}
                        </button>
                    </div>
                </form>
                {error && <p className="mb-2 text-rose-400">{error}</p>}
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
