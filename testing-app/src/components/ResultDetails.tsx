import type {Question} from "../types.ts";
import classes from "../styles/ResultDetails.module.css"

interface ResultDetailsProps {
    score: number;
    totalQuestions: number;
    answers: string[];
    questions: Question[]
}

const ResultDetails = ({ answers, questions }: ResultDetailsProps) => {
    return (
        <ol>
            {questions.map((question: Question, index: number) => (
                <li>
                    {question.questionText + ' '}

                    <span className={answers[index] === question.correctAnswer ? classes.correct : classes.incorrect}>
                        {question.correctAnswer}
                    </span>
                </li>
            ))}
        </ol>
    );
};

export default ResultDetails;