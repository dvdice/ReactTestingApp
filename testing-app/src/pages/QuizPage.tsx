import Header from "../UI/Header.tsx";
import TestQuestion from "../components/TestQuestion.tsx";
import {useEffect, useState} from "react";
import type {ApiQuestion, Question} from "../types.ts";
import {useNavigate} from "react-router-dom";

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const navigate = useNavigate();

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
        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

        if (isCorrect)
            setScore((prev) => prev + 1)

        setAnswers((prev) => [...prev, selectedAnswer])

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(() => currentQuestion + 1);
        } else {
            const finalScore = isCorrect ? score + 1 : score;
            const quizData = {
                score: finalScore,
                totalQuestions: questions.length,
                answers: [...answers, selectedAnswer],
                questions: questions,
            };
            navigate('/results', { state: quizData });
        }

    }

    return (
        <>
            <Header/>
            <h1>Приложение для тестирования. Вопрос {currentQuestion + 1} из {questions.length}</h1>

            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Легко</option>
                <option value="medium">Средне</option>
                <option value="hard">Сложно</option>
            </select>

            {isLoading ? (
                <div className="loader-container">
                    <h2>Вопросы загружаются...</h2>
                </div>
            ) : (
                questions.length > 0 && (
                    <TestQuestion
                        key={currentQuestion}
                        question={questions[currentQuestion]}
                        handleAnswerButtonClick={handleAnswerButtonClick}
                    />
                )
            )}
        </>
    )
};

export default QuizPage;