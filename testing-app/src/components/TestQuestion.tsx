import type {Question} from "../types.ts";
import {useEffect, useState} from "react";

interface TestQuestionProps {
    question: Question;
    handleAnswerButtonClick: (selectedAnswer: string) => void;
    enableTimer?: boolean;
    initTime?: number;
}

const TestQuestion = ({
                                                            question,
                                                            handleAnswerButtonClick,
                                                            enableTimer = false,
                                                            initTime = 1000
                                                        }: TestQuestionProps) => {
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        if (enableTimer) {
            const id = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 1) {
                        handleAnswerButtonClick('')
                        return 10
                    }
                    else
                        return prev - 1
                })
            }, initTime)
            return () => clearInterval(id);
        }
    }, [enableTimer, handleAnswerButtonClick, initTime]);

    return (
        <div className="test-question">
            {enableTimer && (<h3>Времени осталось {timeLeft}</h3>)}
            <h2>{question.questionText}</h2>
            <div className="answers">
                {question.answerOptions.map((answer) => (
                    <button key={answer} onClick={() => handleAnswerButtonClick(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TestQuestion;