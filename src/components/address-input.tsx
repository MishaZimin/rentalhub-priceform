import React, { useState } from "react";
import MapWithMarker from "./map-with-marker";
import { useStore } from "../store/useStore";
import { IoSearch } from "react-icons/io5";
import useGeocode from "../hooks/useGeocode";

interface AddressInputProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const shopLocation = {
    lat: 56.817676,
    lng: 60.608335,
};

const AddressInput: React.FC<AddressInputProps> = ({ onLocationSelect }) => {
    const [address, setAddress] = useState<string>("");

    const distance = useStore((state) => state.distance);
    const setDistance = useStore((state) => state.setDistance);
    const setCost = useStore((state) => state.setCost);

    const {
        geocode,
        userMarkerLat,
        userMarkerLng,
        error,
        isAddressChecked,
        setIsAddressChecked,
        shake,
    } = useGeocode({
        initialLat: shopLocation.lat,
        initialLng: shopLocation.lng,
    });

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setIsAddressChecked(false);
        setDistance(0);
        setCost(0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        geocode(address, onLocationSelect);
    };

    return (
        <>
            <div className="mb-2">
                <form onSubmit={handleSubmit} className="mb-2">
                    <span className="mb-4 font-inter">
                        Ваш адрес в Екатеринбурге:
                    </span>
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
                        </button>
                    </div>
                </form>

                <div className={`${shake ? "animate-shake" : ""}`}>
                    <div className="rounded-xl">
                        {!isAddressChecked ? (
                            <MapWithMarker
                                latitude={shopLocation.lat}
                                longitude={shopLocation.lng}
                            />
                        ) : (
                            <MapWithMarker
                                latitude={userMarkerLat}
                                longitude={userMarkerLng}
                            />
                        )}
                    </div>
                </div>

                {distance !== 0 && (
                    <div className="mb-0">
                        <p className="text-gray-500">
                            Расстояние: {distance.toFixed(1)} км
                        </p>
                    </div>
                )}

                {error && <p className="mb-2 text-rose-400">{error}</p>}
            </div>
        </>
    );
};

export default AddressInput;
