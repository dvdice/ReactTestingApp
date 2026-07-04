import { useEffect, useState } from 'react'
import '../App.css'
import TestResult from "./TestResult.tsx";
import TestQuestion from "./TestQuestion.tsx";
import type {ApiQuestion, Question} from "../types.ts";
import ResultDetails from "./ResultDetails.tsx";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<string>('easy');

    async function fetchData() {
        setIsLoading(true);
        try {
            const res = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${difficulty}`)
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
            setCurrentQuestion(0)
        } catch (error) {
            console.error("Ошибка при загрузке вопросов:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [difficulty]);

    function handleAnswerButtonClick(selectedAnswer: string) {
        if (selectedAnswer === questions[currentQuestion].correctAnswer)
            setScore(() => score + 1)

        setAnswers((prev) => [...prev, selectedAnswer])

        if (currentQuestion + 1 < questions.length)
            setCurrentQuestion(() => currentQuestion + 1);
        else
            setIsFinished(true);
    }

    const restartTest= async () => {
        await fetchData();
        setIsFinished(false);
        setScore(0);
    }

    if (isFinished) {
        return (
            <div>
                <TestResult
                    score={score}
                    onRestartTest={restartTest}
                    totalQuestions={questions.length}
                />

                <ResultDetails
                    score={score}
                    totalQuestions={questions.length}
                    answers={answers}
                    questions={questions}
                />
            </div>
        )
    } else {
        if (isLoading) {
            return (
                <h1>Вопросы загружаются...</h1>
            )
        } else {
            return (
                <div>
                    <h1>Приложение для тестирования. Вопрос {currentQuestion + 1} из {questions.length}</h1>

                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="easy">Легко</option>
                        <option value="medium">Средне</option>
                        <option value="hard">Сложно</option>
                    </select>

                    <TestQuestion
                        key={currentQuestion}
                        question={questions[currentQuestion]}
                        handleAnswerButtonClick={handleAnswerButtonClick}
                    />
                </div>
            )
        }
    }
}

export default App
