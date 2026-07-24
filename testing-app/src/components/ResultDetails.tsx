import type {Question} from "../types.ts";
import styles from "../styles/ResultDetails.module.css"
import classNames from "classnames";

interface ResultDetailsProps {
    score: number;
    totalQuestions: number;
    answers: string[];
    questions: Question[]
}

const ResultDetails = ({ answers, questions }: ResultDetailsProps) => {
    return (
        <ol>
            {questions.map((question, index) => {
                const isCorrect = answers[index] === question.correctAnswer;
                const className = classNames({
                    [styles.correct]: isCorrect,
                    [styles.incorrect]: !isCorrect,
                });
                return (
                    <li key={index}>
                        {question.questionText}{' '}
                        <span className={className}>
                            {question.correctAnswer}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
};

export default ResultDetails;