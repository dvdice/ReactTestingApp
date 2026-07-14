import type {Question} from "../types.ts";
import {useTimer} from "../hooks/useTimer.ts";
import {useEffect} from "react";

interface TestQuestionProps {
    question: Question;
    handleAnswerButtonClick: (selectedAnswer: string) => void;
    enableTimer?: boolean;
    initTime?: number;
}

const TestQuestion = ({
                                                            question,
                                                            handleAnswerButtonClick,
                                                            enableTimer = true,
                                                            initTime = 1000
                                                        }: TestQuestionProps) => {



    const timeLeft = useTimer(enableTimer, initTime);

    useEffect(() => {
        if (timeLeft === 0)
            handleAnswerButtonClick('')
    }, [handleAnswerButtonClick, timeLeft]);

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