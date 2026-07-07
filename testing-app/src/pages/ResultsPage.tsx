import ResultDetails from "../components/ResultDetails.tsx";
import TestResult from "../components/TestResult.tsx";
import Header from "../UI/Header.tsx";
import {useLocation, useNavigate} from 'react-router-dom';


const ResultsPage = () => {
    const { state } = useLocation();
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
        <>
            <Header/>

            <TestResult
                score={state.score}
                totalQuestions={state.totalQuestions}
                onRestartTest={handleRestartTest}
                onNewTest={handleNewTest}
            />

            <ResultDetails
                score={state.score}
                totalQuestions={state.totalQuestions}
                answers={state.answers}
                questions={state.questions}
            />
        </>
    );
};

export default ResultsPage;