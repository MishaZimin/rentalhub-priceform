import { useState } from "react";
import axios from "axios";
import useShakeAnimation from "../hooks/useShakeAnimation";
import { normalizeAddress } from "../utils/normalizeAddress";

interface UseGeocodeProps {
    initialLat: number;
    initialLng: number;
}

const useGeocode = ({ initialLat, initialLng }: UseGeocodeProps) => {
    const [userMarkerLat, setLat] = useState<number>(initialLat);
    const [userMarkerLng, setLng] = useState<number>(initialLng);

    const [isAddressChecked, setIsAddressChecked] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { shake, triggerShake } = useShakeAnimation();

    const geocode = async (
        address: string,
        onLocationSelect: (lat: number, lng: number) => void
    ) => {
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
                triggerShake();
            }
        } catch (err) {
            setError("Произошла ошибка при геокодировании");
            triggerShake();
        }
    };

    return {
        geocode,
        userMarkerLat,
        userMarkerLng,
        error,
        isAddressChecked,
        setIsAddressChecked,
        shake,
    };
};

export default useGeocode;
