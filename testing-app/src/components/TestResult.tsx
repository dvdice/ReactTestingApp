import {useNavigate} from "react-router-dom";

interface TestResultProps {
    score: number;
    totalQuestions: number;
}

const TestResult = ({score, totalQuestions}: TestResultProps) => {
    const navigate = useNavigate();

    function handleNewTest() {
        localStorage.removeItem('score')
        localStorage.removeItem('currentQuestion')
        localStorage.removeItem('answers')
        localStorage.removeItem('questions')

        navigate("/quiz")
    }

    function handleRestartTest() {
        localStorage.removeItem('score')
        localStorage.removeItem('currentQuestion')
        localStorage.removeItem('answers')

        navigate("/quiz")
    }


    return (
        <div className="test-result">
            <h2>Тест завершен!</h2>
            <p>Вы набрали {score} очков из {totalQuestions}</p>
            <button onClick={handleRestartTest}>Пройти заново</button>
            <button onClick={handleNewTest}>Новый тест</button>
        </div>
    );
};

export default TestResult;