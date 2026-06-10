import type {Question} from "../types.ts";
import {useEffect, useState} from "react";

interface TestQuestionProps {
    question: Question;
    handleAnswerButtonClick: (selectedAnswer: string) => void;
}

const TestQuestion = ({question, handleAnswerButtonClick}: TestQuestionProps) => {
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    handleAnswerButtonClick('')
                    return 10
                }
                else
                    return prev - 1
            })
        }, 1000)
        return () => clearInterval(id);
    }, []);

    return (
        <div className="test-question">
            <h3>Времени осталось {timeLeft}</h3>
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