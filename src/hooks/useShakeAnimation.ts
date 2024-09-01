import { useState } from "react";

const useShakeAnimation = () => {
    const [shake, setShake] = useState<boolean>(false);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    return { shake, triggerShake };
};

export default useShakeAnimation;
