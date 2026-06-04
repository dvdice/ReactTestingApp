import type {Question} from "../types.ts";

interface TestQuestionProps {
    question: Question;
    handleAnswerButtonClick: (selectedAnswer: string) => void;
}

const TestQuestion = ({question, handleAnswerButtonClick}: TestQuestionProps) => {
    return (
        <div className="test-question">
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