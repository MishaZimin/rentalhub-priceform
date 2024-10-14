import React, { useState } from "react";
import MapWithMarker from "./map-with-marker";
import { useStore } from "../store/useStore";
import { IoSearch } from "react-icons/io5";
import useGeocode from "../hooks/useGeocode";
import { shopLocation } from "../utils/constants";
import SubmitButton from "../ui/submit-button";

interface AddressInputProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const AddressInput = ({ onLocationSelect }: AddressInputProps) => {
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
            <div className="flex flex-col gap-[8px]">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[4px]">
                    <span className="font-inter">
                        Ваш адрес в Екатеринбурге:
                    </span>
                    <div className="relative flex flex-row w-full gap-[8px]">
                        <input
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Мира 19"
                            className="bg-none h-10 p-2 pl-3 rounded-lg w-[90%] focus:outline-none focus:border-opacity-40 border-[1px] border-graphite border-opacity-20  transition duration-300 transform"
                        />
                        <button
                            type="submit"
                            className="bg-none min-w-10 h-10 p-0 text-black transition duration-300 transform bg-white rounded-lg border-opacity-20 hover:border-opacity-40 border-[1px] border-graphite">
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

                {error && <p className="mb-2 text-red-500">{error}</p>}
            </div>
        </>
    );
};

export default AddressInput;
