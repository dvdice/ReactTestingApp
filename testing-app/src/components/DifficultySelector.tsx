import { Difficulty } from "../enums/Difficulty.ts";
import {useState} from "react";

interface DifficultySelectorProps {
    onDifficultyChange: (newDifficulty: string) => void;
}
type DifficultyKey = keyof typeof Difficulty;

const DifficultySelector = ({ onDifficultyChange } :DifficultySelectorProps) => {
    const [selected, setSelected] = useState<DifficultyKey>('easy')

    const handleDifficultyChange = (newDifficulty: DifficultyKey) => {
        setSelected(newDifficulty);
        onDifficultyChange(newDifficulty)
    }
    return (
        <select
            value={selected}
            onChange={(e) => handleDifficultyChange(e.target.value as DifficultyKey)}
        >
            {Object.entries(Difficulty).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
            ))}
        </select>
    );
};

export default DifficultySelector;