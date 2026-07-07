import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const localValue = localStorage.getItem(key);

            return localValue ? JSON.parse(localValue) as T : initialValue;
        } catch (error) {
            console.error("Ошибка чтения из localStorage: ", error);
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key])

    return [state, setState] as const;
}