import { useState } from 'react'
import '../App.css'
import TestResult from "./TestResult.tsx";

const QUESTIONS = [
    {
        questionText: 'Что из этого является хуком в React?',
        answerOptions: ['useState', 'v-model', 'ng-model', 'defineProps'],
        correctAnswer: 'useState'
    },{
        questionText: 'Что из этого является хуком в React?',
        answerOptions: ['useState', 'v-model', 'ng-model', 'defineProps'],
        correctAnswer: 'useState'
    },{
        questionText: 'Что из этого является хуком в React?',
        answerOptions: ['useState', 'v-model', 'ng-model', 'defineProps'],
        correctAnswer: 'useState'
    },{
        questionText: 'Что из этого является хуком в React??',
        answerOptions: ['useState', 'v-model', 'ng-model', 'defineProps'],
        correctAnswer: 'useState'
    },
]



function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerButtonClick = (selectedAnswer: string) => {
        if (selectedAnswer === QUESTIONS[currentQuestion].correctAnswer) {
            setScore(score + 1)
        }

        if (currentQuestion + 1 < QUESTIONS.length)
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
                totalQuestions={QUESTIONS.length}
            />
        )
    } else {
        return (
            <div className="App">
                <h1>Приложение для тестирования</h1>

                <h2>{QUESTIONS[currentQuestion].questionText}</h2>
                <div className="answers">
                    {QUESTIONS[currentQuestion].answerOptions.map((answer) => (
                        <button key={answer} onClick={() => handleAnswerButtonClick(answer)}>{answer}</button>
                    ))}
                </div>
            </div>
        )
    }
}

export default App
