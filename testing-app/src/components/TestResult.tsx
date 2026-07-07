interface TestResultProps {
    score: number;
    totalQuestions: number;
    onRestartTest: () => void;
    onNewTest: () => void;
}

const TestResult = ({score, totalQuestions, onRestartTest, onNewTest}: TestResultProps) => {
    return (
        <div className="test-result">
            <h2>Тест завершен!</h2>
            <p>Вы набрали {score} очков из {totalQuestions}</p>
            <button onClick={onRestartTest}>Пройти заново</button>
            <button onClick={onNewTest}>Новый тест</button>
        </div>
    );
};

export default TestResult;