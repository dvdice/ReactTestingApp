import {useEffect, useState} from "react";

export function useTimer(enableTimer: boolean, initTime: number) {
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        if (!enableTimer) return;

        const id = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, initTime)

        return () => clearInterval(id);
    }, [enableTimer, initTime]);

    return timeLeft < 0 ? 0 : timeLeft;
}