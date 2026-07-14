import type {Question} from "../types.ts";
import styles from "../styles/ResultDetails.module.css"

interface ResultDetailsProps {
    score: number;
    totalQuestions: number;
    answers: string[];
    questions: Question[]
}

const ResultDetails = ({ answers, questions }: ResultDetailsProps) => {
    return (
        <ol>
            {questions.map((question, index) => (
                <li>
                    {question.questionText + ' '}

                    <span className={answers[index] === question.correctAnswer ? styles.correct : styles.incorrect}>
                        {question.correctAnswer}
                    </span>
                </li>
            ))}
        </ol>
    );
};

export default ResultDetails;