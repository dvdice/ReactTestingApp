import { useEffect, useState } from 'react'
import '../App.css'
import TestResult from "./TestResult.tsx";
import TestQuestion from "./TestQuestion.tsx";
import type {ApiQuestion, Question} from "../types.ts";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);

    async function fetchData() {
        try {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            const data: { results: ApiQuestion[] } = await res.json();

            const transformedQuestions: Question[] = data.results.map((item: ApiQuestion) => {
                const allAnswers = [...item.incorrect_answers, item.correct_answer];
                const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

                return {
                    questionText: item.question,
                    correctAnswer: item.correct_answer,
                    answerOptions: shuffledAnswers,
                };
            });

            setQuestions(transformedQuestions);
        } catch (error) {
            console.error("Ошибка при загрузке вопросов:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleAnswerButtonClick = (selectedAnswer: string) => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer)
            setScore(score + 1)

        if (currentQuestion + 1 < questions.length)
            setCurrentQuestion(currentQuestion + 1);
        else
            setIsFinished(true);
    }

    const restartTest= () => {
        setCurrentQuestion(0);
        setIsFinished(false);
        setScore(0);
    }

    if (isFinished) {
        return (
            <TestResult
                score={score}
                onRestartTest={restartTest}
                totalQuestions={questions.length}
            />
        )
    } else {
        if (isLoading) {
            return (
                <h1>Вопросы загружаются...</h1>
            )
        } else {
            return (
                <div>
                    <h1>Приложение для тестирования</h1>

                    <TestQuestion
                        question={questions[currentQuestion]}
                        handleAnswerButtonClick={handleAnswerButtonClick}
                    />
                </div>
            )
        }
    }
}

export default App
