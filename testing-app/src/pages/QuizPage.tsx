import Header from "../UI/Header.tsx";
import TestQuestion from "../components/TestQuestion.tsx";
import {useCallback, useEffect, useState} from "react";
import type {ApiQuestion, Question} from "../types.ts";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {decodeHTML} from "../utils/decodeHTML.ts";
import DifficultySelector from "../components/DifficultySelector.tsx";

const QuizPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useLocalStorage('currentQuestion', 0);
    const [score, setScore] = useLocalStorage('score',0);
    const [questions, setQuestions] = useLocalStorage<Question[]>('questions', []);
    const [answers, setAnswers] = useLocalStorage<string[]>('answers', []);
    const [difficulty, setDifficulty] = useLocalStorage<string>('difficulty','easy');
    const navigate = useNavigate();

    const fetchData = useCallback(async (passedDifficulty?: string) => {
        const currentDifficulty = passedDifficulty || difficulty;
        setIsLoading(true);
        try {
            const res = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${currentDifficulty}`)
            const data: { results: ApiQuestion[] } = await res.json();

            const transformedQuestions: Question[] = data.results.map((item: ApiQuestion) => {
                const allAnswers = [...item.incorrect_answers, item.correct_answer];
                const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

                return {
                    questionText: decodeHTML(item.question),
                    correctAnswer: decodeHTML(item.correct_answer),
                    answerOptions: shuffledAnswers.map((answer) => decodeHTML(answer)),
                };
            });

            setQuestions(transformedQuestions);
            setCurrentQuestion(0)
        } catch (error) {
            console.error("Ошибка при загрузке вопросов:", error);
        } finally {
            setIsLoading(false);
        }
    }, [difficulty, setCurrentQuestion, setQuestions])

    useEffect(() => {
        if (questions.length === 0)
            fetchData()
    }, [fetchData, questions.length]);

    function handleAnswerButtonClick(selectedAnswer: string) {
        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

        if (isCorrect)
            setScore((prev) => prev + 1)

        setAnswers((prev) => [...prev, selectedAnswer])

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prev) => prev + 1);
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

    async function onDifficultyChange(newDifficulty: string) {
        setDifficulty(newDifficulty);
        setScore(0);
        setAnswers([]);

        await fetchData(newDifficulty)
    }

    return (
        <>
            <Header/>
            <h1>Приложение для тестирования. Вопрос {currentQuestion + 1} из {questions.length}</h1>

            <DifficultySelector onDifficultyChange={onDifficultyChange}></DifficultySelector>

            {/*<select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
                <option value="easy">Легко</option>
                <option value="medium">Средне</option>
                <option value="hard">Сложно</option>
            </select>*/}

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